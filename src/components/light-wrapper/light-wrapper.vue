<template >
  <div id="light-wrapper">
    <div class="light">
      <light-elem
        v-for="el in lightElem"
        :key="el.id"
        :isActive="el.isActive"
        :color="el.color"
      />
    </div>
    timer: {{ timer / 1000 }}
  </div>
</template>
<script>
import lightElem from "../light-elem/light-elem.vue";

export default {
  components: { lightElem },
  name: "light-wrapper",
  data() {
    return {
      timer: 0,
      lightElem: [
        {
          id: 1,
          isActive: false,
          color: "red",
          secondActive: 10000,
        },
        {
          id: 2,
          isActive: false,
          color: "yellow",
          secondActive: 3000,
        },
        {
          id: 3,
          isActive: false,
          color: "green",
          secondActive: 15000,
        },
      ],
    };
  },
 
  created() {
    let th = this;
    let green = this.lightElem[2].color;
    let yellow = this.lightElem[1].color;
    let red = this.lightElem[0].color;
    let path = this.$route.path
    function test(path){
      if (path === "/red"){return 0}
      if (path === "/yellow"){return 1}
      if (path === "/green"){return 2}
    }

    function changeActive(color) {
      if (color === "red") {
        th.lightElem[0].isActive = !th.lightElem[0].isActive;
      }
      if (color === "yellow") {
        th.lightElem[1].isActive = !th.lightElem[1].isActive;
      }
      if (color === "green") {
        th.lightElem[2].isActive = !th.lightElem[2].isActive;
      }
    }
    function changeTimer(time) {
      th.timer = time;
    }

    // Мерцание когда остаётся меньше 3 секунд
    function flicker(color) {
      th.lightElem.forEach((el, k) => {
        if (el.color === color) {
          th.lightElem[k].isActive = !th.lightElem[k].isActive;
        }
      });
    }
    // Меняет прозрачность экрана(в качестве аргумента цвет экрана который мы хотим изменить)
    function workColorLight(color) {
      let time = 0;
      th.$router.push({ path: color });
      th.lightElem.forEach((el) => {
        if (el.color === color) {
          time = el.secondActive;
        }
      });
      let timeChange = setInterval(() => {
        if (time === 0) {
          clearInterval(timeChange);
          return;
        }
        if (time <= 3000) {
          flicker(color);
        }
        console.log(path)
        time = time - 1000;
        changeTimer(time);
      }, 1000);

      return new Promise((res) => {
        changeActive(color);
        setTimeout(() => {
          res("res");
        }, time);
      });
    }
    // Заставляет экраны светиться в порядке очереди, цикл бесконечный
    function workColorRestart() {
      workColorLight(red)
        .then(() => {
          return workColorLight(yellow);
        })
        .then(() => {
          return workColorLight(green);
        })
        .then(() => {
          return workColorLight(yellow);
        })
        .then(() => workColorRestart());
    }
    // Позволяет выбрать с какого экрана начнется цикл
    async function startChangeLight(num) {
      for (let i = num; i < 3; i++) {
        if (num === 2) {
          await workColorLight(th.lightElem[2].color);
          await workColorLight(th.lightElem[1].color);
          workColorRestart();
          return;
        }
        await workColorLight(th.lightElem[i].color);
        if (i === 2) {
          workColorRestart();
          return;
        }
      }
    }
    startChangeLight(test(path));
  },
};
</script>
<style lang="scss" src="./light-wrapper.scss"></style>