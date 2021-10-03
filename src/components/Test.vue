<template>
    <div class="set">
        <div class="setting">
            <span class="set_span">Количество недель при загрузке:  </span>       
            <input class="set_input" type="number" value="6">
        </div>
            
    </div>
</template>
<script>
export default {
    
}
</script>
<style>
    .setting {
        display: flex;
        align-items: center;
    }
    .set_span {
        width: auto;
        padding-right: 5px;
    }
    .set_input {
        height: 20px!important;
        width: 50px!important;
        text-align: center;
    }
</style>