<template>
  <div class="ai-home">
    <section class="intro-section">
      <p class="eyebrow">ABOUT ME</p>
      <h2>你好，我是 秋水揽星</h2>
      <p class="lead">
        我是一名 AI 开发工程师，专注 AI 应用开发，持续关注 Agent、RAG、智能客服与企业 AI 应用。
        这里用于记录工程实践、项目过程和可复用的技术笔记。
        天行健，君子以自强不息。
      </p>
      <div class="contact-row">
        <a href="https://github.com/qiushuilanxing-ship-it" target="_blank" rel="noopener noreferrer">GitHub</a>
        <a href="mailto:qiushuilanxing@gmail.com">qiushuilanxing@gmail.com</a>
        <span>QQ：1932439891</span>
      </div>
    </section>

    <section>
      <div class="section-heading">
        <p class="eyebrow">FOCUS</p>
        <h2>技术方向</h2>
      </div>
      <div class="direction-grid">
        <article v-for="item in directions" :key="item.title" class="info-card">
          <span class="card-index">{{ item.index }}</span>
          <h3>{{ item.title }}</h3>
          <p>{{ item.description }}</p>
        </article>
      </div>
    </section>

    <section>
      <div class="section-heading">
        <p class="eyebrow">PROJECTS</p>
        <h2>我的项目</h2>
        <p>项目代码与外部链接将在整理并上传后补充。</p>
      </div>
      <div class="project-grid">
        <router-link v-for="project in projects" :key="project.title" :to="project.link" class="project-card">
          <span class="status">持续整理中</span>
          <h3>{{ project.title }}</h3>
          <p>{{ project.description }}</p>
          <span class="card-link">查看项目记录 →</span>
        </router-link>
      </div>
    </section>

    <section>
      <div class="section-heading">
        <p class="eyebrow">EXPLORE</p>
        <h2>博客文章分类</h2>
      </div>
      <div class="category-grid">
        <article v-for="group in categories" :key="group.title" class="category-card">
          <router-link :to="group.link" class="category-title">{{ group.title }}</router-link>
          <p>{{ group.description }}</p>
          <div class="tag-links">
            <router-link v-for="item in group.items" :key="item.name" :to="item.link">
              {{ item.name }}
            </router-link>
          </div>
        </article>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  data() {
    return {
      directions: [
        { index: '01', title: 'Agent', description: '围绕智能体架构、工具调用、工作流与多 Agent 协作进行工程实践。' },
        { index: '02', title: 'RAG', description: '记录知识入库、检索、重排、生成与评估链路的实现方法。' },
        { index: '03', title: 'MCP', description: '探索模型上下文协议及其在工具和企业系统连接中的应用。' },
        { index: '04', title: 'Prompt', description: '沉淀提示词设计、结构化输出、上下文组织与评估方法。' },
        { index: '05', title: '企业 AI 应用', description: '关注智能客服、质量检测和内部效率工具等可落地场景。' },
      ],
      projects: [
        { title: '智能客服 Agent', description: '记录智能客服方向的方案设计与开发过程。', link: '/projects/customer-service-agent/' },
        { title: '视频质检系统', description: '记录视频质检系统的工程实践与迭代过程。', link: '/projects/video-inspection-system/' },
        { title: 'AI 工具开发', description: '沉淀 AI 工具的设计、实现与使用经验。', link: '/projects/ai-tool-development/' },
        { title: '企业 AI 应用', description: '记录企业场景中的 AI 能力接入与工程落地。', link: '/projects/enterprise-ai-applications/' },
        { title: 'LiveInspector', description: '面向企业直播场景的 AI 智能巡检、异常告警与多直播间管理平台。', link: '/projects/live-inspector/' },
      ],
      categories: [
        {
          title: 'AI实践',
          description: 'AI 应用核心能力的实践记录。',
          link: '/ai/',
          items: [
            { name: 'Agent', link: '/ai/agent/' },
            { name: 'RAG', link: '/ai/rag/' },
            { name: 'MCP', link: '/ai/mcp/' },
            { name: 'Prompt', link: '/ai/prompt/' },
          ],
        },
        {
          title: '项目记录',
          description: '从需求到落地的真实项目过程。',
          link: '/projects/',
          items: [
            { name: '智能客服Agent', link: '/projects/customer-service-agent/' },
            { name: '视频质检系统', link: '/projects/video-inspection-system/' },
            { name: 'AI工具开发', link: '/projects/ai-tool-development/' },
            { name: '企业AI应用', link: '/projects/enterprise-ai-applications/' },
            { name: '直播人员检测软件', link: '/projects/live-inspector/' },
          ],
        },
        {
          title: '技术笔记',
          description: '开发过程中持续积累的基础笔记。',
          link: '/tech/',
          items: [
            { name: 'Python', link: '/tech/python/' },
            { name: 'Git', link: '/tech/git/' },
            { name: 'Linux', link: '/tech/linux/' },
            { name: 'Docker', link: '/tech/docker/' },
            { name: 'Frontend', link: '/tech/frontend/' },
          ],
        },
        {
          title: '思考',
          description: '行业、产品、技术路线与项目复盘总结。',
          link: '/thinking/',
          items: [
            { name: 'AI行业观察', link: '/thinking/ai-industry/' },
            { name: '产品思考', link: '/thinking/product/' },
            { name: '技术成长记录', link: '/thinking/technical-growth/' },
          ],
        },
      ],
    }
  },
}
</script>

<style scoped>
.ai-home {
  color: var(--textColor);
}

.ai-home section {
  padding: 2.25rem 0;
  border-bottom: 1px solid var(--borderColor);
}

.ai-home section:last-child {
  border-bottom: 0;
}

.intro-section {
  padding-top: 0.5rem !important;
}

.eyebrow {
  margin: 0 0 0.5rem;
  color: #159b8b;
  font-size: 0.74rem;
  font-weight: 800;
  letter-spacing: 0.16em;
}

.ai-home h2,
.ai-home h3 {
  border-bottom: 0;
}

.ai-home h2 {
  margin: 0 0 0.8rem;
  padding: 0;
}

.lead {
  max-width: 48rem;
  font-size: 1.05rem;
  line-height: 1.9;
}

.contact-row,
.tag-links {
  display: flex;
  flex-wrap: wrap;
  gap: 0.65rem;
}

.contact-row a,
.contact-row span,
.tag-links a {
  padding: 0.42rem 0.75rem;
  border: 1px solid var(--borderColor);
  border-radius: 999px;
  color: var(--textColor);
  font-size: 0.86rem;
}

.section-heading {
  margin-bottom: 1.2rem;
}

.section-heading > p:last-child {
  margin-bottom: 0;
  color: #7b8794;
}

.direction-grid,
.project-grid,
.category-grid {
  display: grid;
  gap: 1rem;
}

.direction-grid {
  grid-template-columns: repeat(2, minmax(0, 1fr));
}

.project-grid,
.category-grid {
  grid-template-columns: repeat(3, minmax(0, 1fr));
}

.info-card,
.project-card,
.category-card {
  box-sizing: border-box;
  padding: 1.2rem;
  border: 1px solid var(--borderColor);
  border-radius: 14px;
  background: var(--mainBg);
}

.project-card {
  color: var(--textColor);
  transition: transform 0.2s ease, border-color 0.2s ease;
}

.project-card:hover {
  border-color: #159b8b;
  transform: translateY(-3px);
}

.card-index,
.status {
  color: #159b8b;
  font-size: 0.75rem;
  font-weight: 700;
}

.info-card h3,
.project-card h3,
.category-card h3 {
  margin: 0.55rem 0;
  padding: 0;
}

.info-card p,
.project-card p,
.category-card p {
  margin-bottom: 0;
  color: #7b8794;
  line-height: 1.7;
}

.card-link {
  display: inline-block;
  margin-top: 1rem;
  color: #159b8b;
  font-size: 0.88rem;
  font-weight: 700;
}

.category-title {
  color: var(--textColor);
  font-size: 1.1rem;
  font-weight: 700;
}

.tag-links {
  margin-top: 1rem;
}

.tag-links a:hover,
.contact-row a:hover {
  border-color: #159b8b;
  color: #159b8b;
}

@media (max-width: 900px) {
  .project-grid,
  .category-grid {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 600px) {
  .direction-grid {
    grid-template-columns: 1fr;
  }

  .ai-home section {
    padding: 1.7rem 0;
  }
}
</style>

<style>
.vdoing-index-class .hero img {
  width: 150px;
  height: 150px;
  border: 4px solid rgba(255, 255, 255, 0.9);
  border-radius: 50%;
  object-fit: cover;
  box-shadow: 0 18px 45px rgba(0, 0, 0, 0.3);
}

.vdoing-index-class .banner .feature h2 {
  color: #ffffff;
}

.vdoing-index-class .theme-vdoing-content.custom.card-box {
  padding-top: 0;
}
</style>
