<template>
  <div class="default">
    <div class="content">
      <van-image class="img" :src="defaultImg" />
      <p>网络异常，请返回重试</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Default',
  data() {
    return {
      defaultImg: 'https://web-data.zmlearn.com/image/wd5XrErJJ9KXySVcBa81jm/default.png',
    };
  },
};
</script>

<style lang="scss" scoped>
.default {
  position: absolute;
  width: 375px;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;

  .content {
    font-size: 14px;
    color: #999;
    text-align: center;

    .img {
      margin-bottom: 16px;
      width: 160px;
    }
  }
}
</style>
