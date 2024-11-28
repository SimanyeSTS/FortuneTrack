<template>
  <svg class="gauge-chart-loader" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid meet">
    <path 
      d="M 10 80 A 40 40 0 0 1 90 80" 
      fill="none" 
      stroke="#e5e7eb" 
      stroke-width="8"
    />
    
    <path 
      d="M 10 80 A 40 40 0 0 1 90 80" 
      fill="none" 
      :stroke="currentColor" 
      stroke-width="8"
      stroke-dasharray="126"
      :stroke-dashoffset="dashOffset"
      class="active-arc"
    />
    
    <line 
      x1="50" 
      y1="80" 
      :x2="armEndX" 
      :y2="armEndY" 
      :stroke="currentColor" 
      stroke-width="2"
      class="gauge-arm"
    />
    
    <circle 
      cx="50" 
      cy="80" 
      r="3" 
      :fill="currentColor"
    />
  </svg>
</template>

<script>
export default {
  data() {
    return {
      armAngle: -90,
      dashOffset: 126, 
      colors: {
        blue: '#3B82F6',
        red: '#EF4444',
        green: '#10B981'
      },
      currentColor: '#3B82F6'
    };
  },
  computed: {
    armEndX() {
      return 50 + Math.cos((this.armAngle - 90) * Math.PI / 180) * 30;
    },
    armEndY() {
      return 80 + Math.sin((this.armAngle - 90) * Math.PI / 180) * 30;
    }
  },
  mounted() {
    this.animateGauge();
  },
  methods: {
    updateColor(progress) {
      if (progress < 0.33) {
        this.currentColor = this.colors.blue;
      } else if (progress < 0.66) {
        this.currentColor = this.colors.red;
      } else {
        this.currentColor = this.colors.green;
      }
    },
    animateGauge() {
      const duration = 1500;
      const startTime = performance.now();
      const startAngle = -90;
      const endAngle = 90;
      const startOffset = 126;
      const endOffset = 0;
      
      const animate = (currentTime) => {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        const eased = progress < 0.5
          ? 2 * progress * progress
          : 1 - Math.pow(-2 * progress + 2, 2) / 2;
        
        this.armAngle = startAngle + (endAngle - startAngle) * eased;
        this.dashOffset = startOffset + (endOffset - startOffset) * eased;
        
        this.updateColor(eased);
        
        if (progress < 1) {
          requestAnimationFrame(animate);
        } else {
          setTimeout(() => {
            this.armAngle = startAngle;
            this.dashOffset = startOffset;
            this.currentColor = this.colors.blue;
            requestAnimationFrame(this.animateGauge);
          }, 500);
        }
      };
      
      requestAnimationFrame(animate);
    }
  }
};
</script>

<style scoped>
.gauge-chart-loader {
  background-color: transparent !important;
  border-radius: 8px;
  padding: 10px;
}

.active-arc {
  transition: stroke-dashoffset 0.5s ease-in-out;
}

.gauge-arm {
  transform-origin: 50px 80px;
}

.active-arc, .gauge-arm {
  transition: all 0.5s ease-in-out;
}
</style>