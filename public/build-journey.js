(() => {
 const root=document.querySelector('#build-journey');
 if(!root)return;
 const lightbox=document.querySelector('.bj-lightbox');
 const picture=document.querySelector('#bj-lightbox-image');
 const caption=document.querySelector('#bj-lightbox-caption');
 let returnFocus;
 root.addEventListener('click',event=>{
  const target=event.target.closest('[data-bj-image]');
  if(!target)return;
  // Preserve a normal image link if the browser has no native dialog support.
  if(typeof lightbox.showModal!=='function'){window.open(target.dataset.bjImage,'_blank','noopener');return;}
  returnFocus=target;picture.src=target.dataset.bjImage;picture.alt=target.dataset.bjCaption;
  caption.textContent=target.dataset.bjCaption;lightbox.showModal();
 });
 lightbox.querySelector('.bj-close').addEventListener('click',()=>lightbox.close());
 lightbox.addEventListener('click',event=>{if(event.target===lightbox){const r=lightbox.getBoundingClientRect();if(event.clientX<r.left||event.clientX>r.right||event.clientY<r.top||event.clientY>r.bottom)lightbox.close();}});
 lightbox.addEventListener('close',()=>returnFocus?.focus());
 const surfaces={
  customer:{image:'post-03.png',title:'Customer menu — actual Android AVD capture',caption:'Category emoji in the running customer app · Android AVD',index:'01 / CUSTOMER'},
  pos:{image:'post-05.png',title:'Merchant order center — actual POS capture',caption:'Received, preparing, ready and collected · merchant POS capture',index:'02 / MERCHANT POS'},
  rider:{image:'post-08.png',title:'Rider ledger — actual Android AVD capture',caption:'Ledger obligations, not transferred funds · Android AVD',index:'03 / RIDER'}
 };
 root.querySelectorAll('[data-bj-surface]').forEach(button=>button.addEventListener('click',()=>{
  const selected=surfaces[button.dataset.bjSurface];
  root.querySelectorAll('[data-bj-surface]').forEach(other=>other.setAttribute('aria-pressed',String(other===button)));
  const img=root.querySelector('#bj-feature');img.src='/assets/campaign-20261031/'+selected.image;img.alt=selected.title;
  const trigger=root.querySelector('.bj-feature-image');trigger.dataset.bjImage=img.getAttribute('src');trigger.dataset.bjCaption=selected.title;
  root.querySelector('#bj-surface-caption').textContent=selected.caption;root.querySelector('.bj-media-index').textContent=selected.index;
 }));
})();
