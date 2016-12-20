println "Checking custom dsl for ${binding.repo.name}..."

println "Binding: ${binding}"
def thisJob = new BaseDefaultJenkinsPipeline(manager, binding)
//def unitTest = thisJob.CreateUnitTestJob()


def CreateCompileJob(thisJob){

  def jobName = binding.projectName + (binding.branch.isDefault ? " " : " (branch - ${binding.branchSimpleName}) ") + "Build"
  def job = manager.job(jobName)
  def repo_href = binding.repo.links.clone.find{it.name == "ssh"}.href
  def stash_href = binding.repo.links.self[0].href
  def repo_name = binding.projectName
  /*
   if(!Binding.branch.isDefault){
   //max length for special name (which we populate with branch name) is 20.   Build task will handle that
   //we care about removing invalid characters
   def cleanBranchName = Binding.branchSimpleName.replaceAll(/[\s]/, '')
   job.environmentVariables{
   env('BRANCH', cleanBranchName)
   }
   }
   */
  job.with{
    description "Compile code for the ${binding.branchName} of ${binding.projectName}. This job is generated using Job-DSL.  Avoid making changes manually as they will be replaced on next execution. You can find the source for this project at $stash_href"
    deliveryPipelineConfiguration('build', 'build')
    triggers{
      scm("0 0 1 1 0")
    }
    environmentVariables {
            env('CI', true)
            env('SAUCE_USERNAME', 'globalx_spartans')
            env('SAUCE_ACCESS_KEY', '8c3cda3b-e605-4017-92fb-40d7539cb9df')
        }
    wrappers {
      colorizeOutput(colorMap = 'xterm')
    }
    scm {
      git {
        remote {
          url("$repo_href")
          credentials(binding.stashCredential)
        }
        branch(binding.branchName)
      }
    }
    steps{
      powerShell("npm i")
      powerShell("npm update")
      powerShell("gulp unit")
      powerShell("gulp dist")
      powerShell("npm publish")
    }
    publishers {
        archiveXUnit {
                jUnit {
                    pattern('test-results.xml')
                }
            }
        publishHtml {
             report('coverage/PhantomJS') {
                 reportName('Coverage')
                 keepAll()
                 allowMissing()
                 alwaysLinkToLastBuild()
             }
         }
        hipChat {
         rooms('Developers')
                notifyFailure()
                notifySuccess()
        }
      }
  }

  defaultLogRotation(job)
  job
}

public void defaultLogRotation(job){
  job.logRotator(-1, 3)
}

def Trigger(first, second){
  first.with{
    publishers {
      downstream(second.name, 'SUCCESS')
    }
  }
  first
}

def buildJob = CreateCompileJob(thisJob)
thisJob.Jobs.put(0, buildJob)


thisJob
