<template>
  <aside ref="webInfo" class="web-info card-box" aria-labelledby="site-info-title">
    <div id="site-info-title" class="webinfo-title">
      <i class="iconfont icon-award" aria-hidden="true"></i>
      <span>站点信息</span>
    </div>

    <dl class="webinfo-list">
      <div class="webinfo-item">
        <dt>文章总数</dt>
        <dd>{{ articleCount }} 篇</dd>
      </div>
      <div class="webinfo-item">
        <dt>运行时间</dt>
        <dd>{{ runningTimeText }}</dd>
      </div>
      <div class="webinfo-item">
        <dt>总字数</dt>
        <dd>{{ totalWordsText }}</dd>
      </div>
      <div class="webinfo-item">
        <dt>最近更新</dt>
        <dd>{{ lastUpdatedText }}</dd>
      </div>
      <div v-if="showVisits" id="busuanzi_container_site_pv" class="webinfo-item">
        <dt>访问量</dt>
        <dd>
          <span id="busuanzi_value_site_pv" class="web-site-pv" aria-live="polite">
            <i class="loading iconfont icon-loading" title="正在获取访问量" aria-label="正在获取访问量"></i>
          </span>
          次
        </dd>
      </div>
    </dl>
  </aside>
</template>

<script>
import { dayDiff, timeDiff, getTimeNum } from '../webSiteInfo/utils'
import fetchPageViews from '../webSiteInfo/busuanzi'

const parseWordCount = (value) => {
  if (typeof value === 'number') return value
  if (typeof value !== 'string') return 0

  const normalized = value.trim().toLowerCase()
  const amount = Number.parseFloat(normalized)
  if (Number.isNaN(amount)) return 0
  return normalized.endsWith('k') ? amount * 1000 : amount
}

const formatWordCount = (value) => {
  if (value < 1000) return String(Math.round(value))
  return `${Math.round(value / 100) / 10}k`
}

export default {
  data() {
    return {
      runningDays: 0,
      mountTimer: null,
    }
  },
  computed: {
    blogInfo() {
      return this.$themeConfig.blogInfo || {}
    },
    articleCount() {
      return Array.isArray(this.$filterPosts) ? this.$filterPosts.length : 0
    },
    runningTimeText() {
      return this.runningDays > 0 ? `${this.runningDays} 天` : '今天开始'
    },
    totalWordsText() {
      const files = Array.isArray(this.blogInfo.eachFileWords)
        ? this.blogInfo.eachFileWords
        : []
      const total = files.reduce(
        (sum, file) => sum + parseWordCount(file.wordsCount),
        0
      )
      return `${formatWordCount(total)} 字`
    },
    lastUpdatedText() {
      const posts = Array.isArray(this.$filterPosts)
        ? [...this.$filterPosts].sort((left, right) => getTimeNum(right) - getTimeNum(left))
        : []
      const latest = posts[0]
      if (!latest) return '暂无文章'
      return timeDiff(latest.lastUpdated || latest.frontmatter.date)
        .replace(' secs', ' 秒前')
        .replace(' minutes', ' 分钟前')
        .replace(' hours', ' 小时前')
        .replace(' days', ' 天前')
        .replace(' months', ' 个月前')
        .replace(' years', ' 年前')
    },
    showVisits() {
      return this.blogInfo.indexView !== false
    },
  },
  mounted() {
    this.runningDays = this.blogInfo.blogCreate
      ? dayDiff(this.blogInfo.blogCreate)
      : 0
    this.mountIntoSidebar()
    if (this.showVisits) fetchPageViews()
  },
  beforeDestroy() {
    if (this.mountTimer) window.clearInterval(this.mountTimer)
    const element = this.$refs.webInfo
    if (element && element.parentNode) element.parentNode.removeChild(element)
  },
  methods: {
    mountIntoSidebar() {
      let attempts = 0
      this.mountTimer = window.setInterval(() => {
        attempts += 1
        const sidebar = document.querySelector('.home-wrapper .main-right')
        const element = this.$refs.webInfo
        if (sidebar && element) {
          sidebar.appendChild(element)
          window.clearInterval(this.mountTimer)
          this.mountTimer = null
        } else if (attempts >= 50) {
          window.clearInterval(this.mountTimer)
          this.mountTimer = null
        }
      }, 100)
    },
  },
}
</script>

<style scoped>
.web-info {
  padding: 0.95rem;
  font-size: 0.875rem;
}

.webinfo-title {
  padding-bottom: 0.65rem;
  color: #888;
  font-weight: 700;
  text-align: center;
}

.webinfo-title .iconfont {
  width: 1.25em;
  margin-right: 0.25rem;
  font-size: 0.875rem;
  font-weight: 900;
}

.webinfo-list {
  margin: 0;
}

.webinfo-item {
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  gap: 0.75rem;
  padding-top: 0.55rem;
}

.webinfo-item dt,
.webinfo-item dd {
  margin: 0;
}

.webinfo-item dd {
  flex: none;
  font-variant-numeric: tabular-nums;
  text-align: right;
}

.loading {
  display: inline-block;
  animation: webinfo-turn 1s linear infinite;
}

@keyframes webinfo-turn {
  to {
    transform: rotate(360deg);
  }
}
</style>
