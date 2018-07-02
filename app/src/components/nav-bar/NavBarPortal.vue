<template>
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark" v-if="currentRoute == '/' || currentRoute == '/instructions'">
        <div class="container">
            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarTogglerDemo03" aria-controls="navbarTogglerDemo03" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <a class="navbar-brand" href="/">RecTwitter</a>
            <div class="collapse navbar-collapse" id="navbarTogglerDemo03" v-if="currentRoute != '/instructions'">
                <ul class="navbar-nav mr-auto mt-2 mt-lg-0">
                    <li class="nav-item">
                        <a class="nav-link" href="#" data-toggle="modal" data-target="#modalInstructions">Instructions
                            <span class="sr-only">(current)</span>
                        </a>
                    </li>
                </ul>
            </div>
        </div>
    </nav>

</template>

<script>
export default {
  data() {
    return {
      currentRoute: window.location.pathname
    };
  }
};
</script>

