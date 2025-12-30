<template>
  <div class="bg-white/20 p-6 rounded-lg mt-8">
    <h3 class="text-xl font-bold mb-4 text-white">🛡️ XSS 防護測試</h3>
    
    <!-- 測試 1: 安全的 HTML -->
    <div class="mb-6">
      <h4 class="text-lg mb-2 text-green-300">✅ 安全 HTML (應該正常顯示)</h4>
      <div 
        v-dompurify-html="safeHTML" 
        class="bg-green-100 p-3 rounded text-black border-l-4 border-green-500"
      ></div>
    </div>
    
    <!-- 測試 2: 危險的腳本 -->
    <div class="mb-6">
      <h4 class="text-lg mb-2 text-red-300">❌ 危險腳本 (應該被過濾)</h4>
      <div 
        v-dompurify-html="dangerousScript" 
        class="bg-red-100 p-3 rounded text-black border-l-4 border-red-500"
      ></div>
    </div>
    
    <!-- 測試 3: 允許的 iframe -->
    <div class="mb-6">
      <h4 class="text-lg mb-2 text-blue-300">🎯 允許的 iframe (應該顯示)</h4>
      <div 
        v-dompurify-html="allowedIframe" 
        class="bg-blue-100 p-3 rounded text-black border-l-4 border-blue-500"
      ></div>
    </div>
    
    <!-- 測試 4: 不允許的標籤 -->
    <div class="mb-6">
      <h4 class="text-lg mb-2 text-yellow-300">⚠️ 不允許的標籤 (應該被過濾)</h4>
      <div 
        v-dompurify-html="disallowedTags" 
        class="bg-yellow-100 p-3 rounded text-black border-l-4 border-yellow-500"
      ></div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

// 安全的 HTML
const safeHTML = ref(`
  <p><strong>這是安全的 HTML</strong></p>
  <ul>
    <li><em>斜體文字</em></li>
    <li><span style="color: blue;">藍色文字</span></li>
  </ul>
`)

// 危險的腳本 (應該被過濾)
const dangerousScript = ref([
  '<p>這個段落後面有危險腳本:</p>',
  '<script>alert("XSS 攻擊！")<\/script>',
  '<img src="invalid" onerror="alert(\'圖片錯誤 XSS!\')" />',
  '<div onclick="alert(\'點擊 XSS!\')">點擊我</div>'
].join(''))

// 允許的 iframe (根據配置應該顯示)
const allowedIframe = ref(`
  <p>YouTube 影片 iframe:</p>
  <iframe 
    width="300" 
    height="200" 
    src="https://www.youtube.com/embed/dQw4w9WgXcQ" 
    frameborder="0" 
    allowfullscreen>
  </iframe>
`)

// 不允許的標籤 (應該被過濾)
const disallowedTags = ref(`
  <p>以下標籤應該被過濾:</p>
  <object data="malicious.swf"></object>
  <embed src="malicious.swf"></embed>
  <form action="/submit" method="post">
    <input type="text" name="username" />
    <button type="submit">提交</button>
  </form>
`)
</script>

<style scoped>
/* iframe 樣式調整 */
:deep(iframe) {
  max-width: 100%;
  border-radius: 4px;
}
</style>