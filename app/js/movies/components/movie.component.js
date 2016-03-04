function MovieComponent() {

    return {
        restrict: 'E',
        template: `
            <div class="movie-component">
              <h1>{{$ctrl.movie.name}}</h1>
            </div>
        `,
        bindings: {
            movie: '<'
        },
        controller: MovieComponentController
    };

    function MovieComponentController() {
        var ctrl = this;
    }
}

export default {
    name: 'movie',
    type: 'component',
    fn: MovieComponent
};
