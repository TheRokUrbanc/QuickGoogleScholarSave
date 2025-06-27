# ScholarSaver

A lightweight JavaScript bookmarklet that automates saving Google Scholar search results by clicking the “Save” buttons, applying custom tag filters (like “doktorat” ), and navigating through pages automatically. Easily customizable for different languages by adjusting label texts. Ideal for quickly batch-saving and filtering scholarly articles over multiple pages.
Currently you need to click for each page on bookmark.

---

## How to Use

1. **Open Google Scholar search results page (Page 1).**

2. **Run the bookmarklet (see code below) in your browser console or save it as a bookmarklet.**

3. The script will:
   - Click all "Save" buttons on the current page.
   - Filter labels based on the specified label variables.
   - Close the dialog.
   - Wait a short delay between clicks to avoid issues.
   - Automatically click the "Naslednja" (Next) button to go to the next page if available.

4. **Repeat on subsequent pages** by running the bookmarklet again if automatic navigation doesn't work.

---

## How to Localize Labels

The script uses three key text labels that depend on your Google Scholar interface language:

- **label1** — The first filter label to click (e.g., `'doktorat'`)
- **label2** — The second filter label to click (e.g., `'končano'`)
- **nextPageText** — The text of the "Next" page button (e.g., `'naslednja'`)

To adapt this script to your language or customized interface:

1. Open Google Scholar in your browser with your preferred language settings.
2. On a search results page, **manually click a "Save" button** on any article.
3. In the popup, check the exact text of the filter labels you want to target.
4. Find the **Next** page button text at the bottom of the page.
5. Replace the values of `label1`, `label2`, and `nextPageText` in the script with these texts in **lowercase**.

For example, if your interface is English, you might set:

```javascript
const label1 = 'phd';      // you need to create this at first save as tag in my library
const label2 = 'completed';
const nextPageText = 'next';
```


```javascript


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
```
