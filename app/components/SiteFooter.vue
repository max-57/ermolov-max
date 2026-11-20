<script setup lang="ts">
import { profileContacts, resumeUrl } from '~/content/profile'

const { language } = usePortfolioRouting()
const english = computed(() => language.value === 'en')
const email = profileContacts.find(contact => contact.name === 'mail')!
const socials = profileContacts.filter(contact => contact.name === 'telegram' || contact.name === 'linkedin')
</script>

<template>
  <footer class="site-footer" aria-labelledby="contact-title">
    <div class="site-footer-inner">
      <div>
        <h2 id="contact-title">{{ english ? 'Get in touch' : 'Связаться' }}</h2>
        <p>{{ english ? 'Open to product design and design engineering roles. Ready to relocate.' : 'Рассматриваю роли продуктового дизайнера и Design Engineer. Готов к переезду.' }}</p>
      </div>
      <a v-magnetic class="footer-email" :href="email.href">{{ email.label }}</a>
      <div class="footer-links">
        <a v-for="social in socials" :key="social.name" :href="social.href" class="text-link">{{ social.label }}</a>
        <a :href="resumeUrl" class="text-link">{{ english ? 'Download CV' : 'Скачать резюме' }}</a>
      </div>
    </div>
    <p class="site-credit">© {{ new Date().getFullYear() }} {{ english ? 'Maxim Ermolov' : 'Максим Ермолов' }}</p>
  </footer>
</template>
