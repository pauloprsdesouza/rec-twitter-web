<template>
    <div>
        <partial-instructions></partial-instructions>
        <div class="card mt-3">
            <div class="card-body">
                <h1 class="display-6">
                    RecTwitter Tutorial
                </h1>
                <div class="row justify-content-center video-tutorial">
                    <div class="col-md-12 col-sm-12">
                        <div class="embed-responsive embed-responsive-16by9 mt-5" style="height:400px; margin-left:auto; margin-right:auto">
                            <iframe class="embed-responsive-item" src="https://www.youtube.com/embed/ktYsCZJYArU" allowfullscreen></iframe>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import PartialInstructions from "@/components/instructions/InstructionsPartial";

export default {
  components: {
    PartialInstructions
  }
};
</script>
