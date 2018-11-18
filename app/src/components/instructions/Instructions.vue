<template>
    <div class="modal fade" id="modalInstructions" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-lg" role="document">
            <div class="modal-content">
                <partial-instructions></partial-instructions>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-dismiss="modal">
                        <span>Close</span>
                    </button>
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
