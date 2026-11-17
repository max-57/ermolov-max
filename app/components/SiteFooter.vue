<script setup lang="ts">
import { profileContacts } from '~/content/profile'

const { language, pathFor } = usePortfolioRouting()
const contacts = ['mail', 'telegram', 'linkedin', 'phone']
  .flatMap(name => profileContacts.filter(contact => contact.name === name))
</script>

<template>
  <footer class="footer">
    <div class="footer-container">
      <div class="footer-content">
        <div class="footer-brand">
          <img :src="'/images/Logo.svg'" alt="" class="footer-logo">
          <h3>{{ language === 'en' ? 'Maxim Ermolov' : 'Максим Ермолов' }}</h3>
        </div>
        <NuxtLink class="footer-contact-item" :to="pathFor()">{{ language === 'en' ? 'About me' : 'Обо мне' }}</NuxtLink>
        <NuxtLink class="footer-contact-item" :to="pathFor('portfolio')">{{ language === 'en' ? 'Portfolio' : 'Портфолио' }}</NuxtLink>
      </div>
      <div class="footer-content">
        <a v-for="contact in contacts" :key="contact.name" class="footer-contact-item" :href="contact.href">
          <img :src="contact.icon" alt="">
          <span>{{ contact.label }}</span>
        </a>
      </div>
    </div>
    <div class="footer-bottom"><p>© 2026 • Maxim Ermolov</p></div>
  </footer>
</template>
