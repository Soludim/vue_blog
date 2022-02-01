<template>
  <div class="loading">
    <span></span>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
.loading {
  display: flex;
  justify-content: center;
  align-items: center;
  @keyframes spin {
    to {
      transform: rotateZ(360deg);
    }
  }
  span {
    display: block;
    width: 20px;
    height: 20px;
    border: 3px solid transparent;
    border-top-color: #fff;
    border-bottom-color: #fff;
    border-radius: 50%;
    animation: spin ease 1000ms infinite;
  }
}
</style>