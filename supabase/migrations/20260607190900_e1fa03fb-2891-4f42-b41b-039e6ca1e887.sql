UPDATE site_settings SET
  social_instagram = 'https://www.instagram.com/edu_total/',
  social_facebook = 'https://www.facebook.com/EduTotal/',
  social_twitter = 'https://x.com/EduTotalCom',
  social_youtube = 'https://www.youtube.com/@EduTotalglobal'
WHERE id = (SELECT id FROM site_settings LIMIT 1);