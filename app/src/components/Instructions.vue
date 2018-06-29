<template>
    <div class="modal fade" id="modalInstructions" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-lg" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLabel">Instructions of the experiment</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    <p class="lead text-justify">
                        This experiment aims to
                        <mark>analyze the interactions</mark> with the tweets received on his timeline. Hence some criteria are required to realize this experiment such as shown below:
                    </p>
                    <h1 class="display-6">Criteria</h1>
                    <ul class="list-group mb-5">
                        <li class="list-group-item lead">
                            <i class="far fa-clock fa-2x align-middle"></i>&nbsp;To use Twitter within a period of 24 hours</li>
                        <li class="list-group-item lead">
                            <i class="fas fa-user fa-2x align-middle"></i>&nbsp;To follow at least 10-20 accounts</li>
                        <li class="list-group-item lead text-justify">
                            <i class="far fa-hand-pointer fa-2x align-middle"></i>&nbsp;To interact at least with 20 received tweets on the timeline through any criteria of interaction for instance: retweet, like or reply</li>
                    </ul>

                    <h1 class="display-6">Example of a tweet</h1>
                    <div class="card mb-5">
                        <div class="card-body">
                            <div class="row">
                                <div class="col-md-1">
                                    <i class="fas fa-user-circle fa-3x"></i>
                                </div>
                                <div class="col-md-11">
                                    <b>Steve Jobs</b> @stevejobs 31 de dez de 2017
                                    <div class="div-message"></div>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col">
                                    <div class="div-message"></div>
                                    <div class="div-message"></div>
                                    <div class="div-message"></div>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-md-2">
                                    <i class="far fa-comment"></i>&nbsp;13
                                </div>
                                <div class="col-md-2">
                                    <i class="fas fa-retweet text-success"></i>&nbsp;
                                    <span class="text-success">5</span>
                                </div>
                                <div class="col-md-2">
                                    <i class="fas fa-heart text-danger"></i>&nbsp;
                                    <span class="text-danger">320</span>
                                </div>
                                <div class="col-md-2">
                                    <i class="far fa-envelope"></i>
                                </div>
                            </div>
                            <p class="lead text-justify mt-4">
                                If have any doubt see the
                                <a href="https://help.twitter.com/pt/glossary">Twitter Glossary</a>
                            </p>
                        </div>
                    </div>

                    <h1 class="display-6">Attention</h1>
                    <p class="lead text-justify">
                        This system
                        <mark>does not save any credentials</mark> of his account ex.: username and password. Remember only the data of the timeline and profile are used for the analysis and none data are published or shared with others applications.
                    </p>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {};
</script>
