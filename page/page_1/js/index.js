new Vue({
  el: "#app",
  data: {
    /**
     * 初始步数
     * 步数历史记录
     * 是否步数变化
     */
    stepNumber: 0,
    historyStep: [0],
    flag: false,

    /**
     * 计时是否开始
     * 秒
     * 分
     * 时
     */
    startNumber: 0,
    seconds: 0,
    minutes: 0,
    hours: 0,
    inter: null,
  },
  mounted() {
    // * 初始化自适应页面
    setScale();
    this.getNewData();
    setInterval(() => {
      this.getNewData();
    }, 1000);
  },
  methods: {
    getNewData() {
      $.getJSON("data/index.json", { id: new Date() }, (res) => {
        this.stepNumber = res[0].value;
        this.startNumber = res[1].value;
        /**
         * 存储历史记录
         * 步数更新
         */
        if (this.historyStep.length < 3) {
          this.historyStep.push(res[0].value);
        }
        if (this.historyStep.length === 2) {
          this.start();
        }
        if (this.historyStep.length === 3) {
          this.historyStep.shift();
          this.start();
        }

        /**
         * 时间计时器
         */
        switch (this.startNumber) {
          // * 归零
          case 0:
            this.$refs.time.innerText = "00:00:00";
            this.seconds = 0;
            this.minutes = 0;
            this.hours = 0;
            break;
          // * 开始
          case 1:
            setInterval(this.firing(), 1000);
            break;
          default:
            break;
        }
      });
    },
    // * 步数变化
    start() {
      if (this.historyStep[0] !== this.historyStep[1]) {
        this.flag = true;
      } else {
        this.flag = false;
      }
    },
    // * 开始计时
    firing() {
      this.seconds++;
      // * 分钟 + 1
      if (this.seconds === 60) {
        this.seconds = 0;
        this.minutes++;
      }
      // * 小时 + 1
      if (this.minutes === 60) {
        this.minutes = 0;
        this.hours++;
      }
      // * 格式化时间
      const formattedTime = `${this.hours
        .toString()
        .padStart(2, "0")}:${this.minutes
        .toString()
        .padStart(2, "0")}:${this.seconds.toString().padStart(2, "0")}`;
      this.$refs.time.innerText = formattedTime;
    },
  },
});
