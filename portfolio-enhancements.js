/* Each gallery scrolls independently */
document.querySelectorAll('.portfolio-carousel').forEach((carousel) => {
  const track = carousel.querySelector('.portfolio-track');
  const prev = carousel.querySelector('.carousel-arrow.prev');
  const next = carousel.querySelector('.carousel-arrow.next');
  if (!track) return;
  const step = () => Math.max(track.clientWidth * 0.82, 220);
  prev?.addEventListener('click', () => track.scrollBy({left:-step(),behavior:'smooth'}));
  next?.addEventListener('click', () => track.scrollBy({left:step(),behavior:'smooth'}));
});

/* Certificate image lightbox */
const lightbox = document.getElementById('certificateLightbox');
const lightboxImage = document.getElementById('lightboxImage');
function closeLightbox(){
  if (!lightbox || !lightboxImage) return;
  lightbox.classList.remove('is-open');
  lightbox.setAttribute('aria-hidden','true');
  lightboxImage.src = '';
}
document.querySelectorAll('.certificate-preview').forEach((button) => {
  button.addEventListener('click', () => {
    if (!lightbox || !lightboxImage) return;
    lightboxImage.src = button.dataset.preview;
    lightbox.classList.add('is-open');
    lightbox.setAttribute('aria-hidden','false');
  });
});
document.querySelector('.lightbox-close')?.addEventListener('click',closeLightbox);
lightbox?.addEventListener('click',(event)=>{if(event.target===lightbox)closeLightbox();});
document.addEventListener('keydown',(event)=>{if(event.key==='Escape')closeLightbox();});

/* Local certificate preview only; it does not upload to GitHub */
const uploadInput = document.getElementById('certificateUpload');
const uploadPreview = document.getElementById('certificateUploadPreview');
let activeObjectUrl = null;
uploadInput?.addEventListener('change',()=>{
  const file = uploadInput.files?.[0];
  if(!file || !uploadPreview) return;
  if(activeObjectUrl) URL.revokeObjectURL(activeObjectUrl);
  activeObjectUrl = URL.createObjectURL(file);
  uploadPreview.replaceChildren();
  const img = document.createElement('img');
  img.src = activeObjectUrl;
  img.alt = 'Selected certificate preview';
  const note = document.createElement('p');
  note.textContent = `Preview: ${file.name}. To publish this image, copy it into assets/certificates and update index.html.`;
  uploadPreview.append(img,note);
});
