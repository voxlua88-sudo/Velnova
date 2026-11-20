(() => {
  const about = CONTENT.aboutPage;
  document.querySelector('#about-title').textContent = about.title;
  document.querySelector('#about-lead').textContent = about.lead;
  document.querySelector('#about-story-title').textContent = about.storyTitle;

  const copy = document.querySelector('#about-copy');
  about.story.forEach(text => {
    const paragraph = document.createElement('p');
    paragraph.textContent = text;
    copy.append(paragraph);
  });

  const principles = document.querySelector('#about-pillars');
  about.principles.forEach(({ t, d }) => {
    const card = document.createElement('article');
    const title = document.createElement('h4');
    const description = document.createElement('p');
    card.className = 'about-principle';
    title.textContent = t;
    description.textContent = d;
    card.append(title, description);
    principles.append(card);
  });
})();
