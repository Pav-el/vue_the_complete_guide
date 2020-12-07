const getRandomValue = (max, min) => {
  return Math.floor(Math.random() * (max - min)) + min;
};

const app = Vue.createApp({
  data() {
    return {
      playerHealth: 100,
      monsterHealth: 100,
      currentRound: 0,
      monsterWin: false,
      playerWin: false
    };
  },
  computed: {
    playerBarAnimation() {
      return { width: this.playerHealth + "%" };
    },
    monsterBarAnimation() {
      return { width: this.monsterHealth + "%" };
    },
    specialAttackIsDisabled() {
      return this.currentRound%3 === 0 ? false : true
    },
    gameIsOver() {
      return this.monsterWin || this.playerWin
    }
  },
  watch: {
    playerHealth() {
      if (this.playerHealth <= 0) {
        this.monsterWin = true;
      }
    },
    monsterHealth() {
      if (this.monsterHealth <= 0) {
        this.playerWin = true;
      }
    },
  },
  methods: {
    attackMonster() {
      this.currentRound++;
      const attackValue = getRandomValue(12, 5);
      this.monsterHealth -= attackValue;
      this.attackPlayer();
    },
    attackPlayer() {
      const attackValue = getRandomValue(13, 6);
      this.playerHealth -= attackValue;
      this.currentRound++
    },
    specilaAttackMonster() {
      this.currentRound++;
      const attackValue = getRandomValue(10, 25);
      this.monsterHealth -= attackValue;
      this.attackPlayer();
    },
    checkHealth(value) {
      return value < 15 ? true : false;
    },
    healPlayer() {
      this.currentRound++;
      const healValue = getRandomValue(12, 7);
      if (this.playerHealth + healValue > 100) {
        this.playerHealth = 100;  
      } else {
        this.playerHealth += healValue;
      }
      this.attackPlayer()
    },
    resetGame() {
      this.playerHealth = 100;
      this.monsterHealth = 100;
      this.currentRound = 0;
      this.monsterWin = false;
      this.playerWin = false;
    }
  },
});

app.mount("#game");
