<template>
  <div>
    <p>2</p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      
    }
  },
  mounted:function(){
    this.service({
      url:'/sys/operaterole/add',
      method:'post',
    }).then(function (response) {
     console.log(response)
    }).catch(function (response) {
      console.log(response)
    })
  }
}
</script>
