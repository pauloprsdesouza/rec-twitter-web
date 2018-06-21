<template>
  <div>
     Error 401
     {{msg}}
  </div>
</template>

<script>
export default {
  name: "Unauthorized",
  data() {
    return {
      msg: "Teste"
    };
  }
};
</script>