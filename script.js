javascript:(async()=>{
  const sleep = t => new Promise(r => setTimeout(r, t));
  
  // Customize your filter labels here:
  const label1 = 'doktorat';   // first label to filter (lowercase)
  const label2 = 'končano';    // second label to filter (lowercase)
  const nextPageText = 'naslednja'; // text for the next page link (lowercase)

  async function processPage() {
    await sleep(1000);
    const saveButtons = [...document.querySelectorAll('.gs_or_sav.gs_or_btn')];
    for(let i=0; i < saveButtons.length; i++) {
      saveButtons[i].click();
      await sleep(700);
      const labelElem1 = [...document.querySelectorAll('.gs_lbl')].find(e => e.innerText.trim().toLowerCase() === label1);
      const labelElem2 = [...document.querySelectorAll('.gs_lbl')].find(e => e.innerText.trim().toLowerCase() === label2);
      if(labelElem1) labelElem1.click();
      if(labelElem2) labelElem2.click();
      await sleep(300);
      const doneButton = document.querySelector('.gs_md_btn.gs_md_btn_lsb');
      if(doneButton) doneButton.click();
      await sleep(900);
    }
  }

  await processPage();

  const nav = document.querySelector('#gs_n');
  if(!nav) {
    alert('No navigation div found');
    return;
  }
  const nextPageLink = [...nav.querySelectorAll('a')].find(a => a.textContent.trim().toLowerCase() === nextPageText);
  if(nextPageLink) {
    nextPageLink.click();
  } else {
    alert('No next page');
  }
})();
