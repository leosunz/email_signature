
(function() {
  const fieldNameMapping = {
    primaryName: 'primary-name',
    postion: 'job-position',
    email: 'email-address',
    // mobile: 'mobile-number',
    address: 'address',
  }

  const renderMethod = {
    [fieldNameMapping.primaryName]: (name) => String(name).trim(),
    [fieldNameMapping.postion]: (postion) => String(postion).trim(),
    [fieldNameMapping.email]: (email) => String(email).trim(),
    // [fieldNameMapping.mobile]: (number) => number && number.length > 0 ? `+${String(number).trim().match(/\d{1,3}/g).join(' ')}` : '',
    [fieldNameMapping.address]: (address) => String(address).trim(),
  };

  const fieldCollection = new Map();

  const $form = document.querySelector('#form');
  const $present = document.querySelector('#present');
  const $status = document.querySelector('#status');

  function render($input) {
    const field = $input.getAttributeNode('name').value;

    if (field === 'logo-size') {
      let $target = document.querySelector("#logo-image");
      $target.setAttribute('width', $input.value);
    } else if (field === 'image-size') {
      let $target = document.querySelector("#image");
      $target.setAttribute('width', $input.value);
    } else if (field === 'version-name') {
      //let $target = document.querySelector("#image");
      //$target.setAttribute('width', $input.value);
      console.log('Version name');
      console.log('Input Tag =>', $input);
      console.log('Value =>', $input.checked);
      if ($input.checked) {//Wolrd-wide
        let $textContent1 = document.querySelector("#content-text-first");
        let $textContent2 = document.querySelector("#content-text-second");
        let $websiteInput = document.querySelector("#input-address");
        let $website = document.querySelector("#address");
        let $logoLink = document.querySelector("#logo-link");
        $textContent1.innerText = "The Information contained in this email and any subsequent correspondence from Sanus Financial Services Limited is private and is intended solely for the intended recipient(s). For those other than the recipient, any disclosure, copying, distribution, or any action taken or omitted to be taken in reliance on such information is prohibited and may be unlawful. If you have received this transmission in error please contact the sender.";
        $textContent2.innerText = "Trading Forex, CFDs and Cryptocurrencies involves significant risk and may not be suitable for all investors. Sanus Financial Services Limited with registration number 2020/659426/07 is authorised and regulated by the Financial Sector Conduct Authority (FSCA) with License number 51523 dated 10/6/2021.";
        $websiteInput.value = "https://world.ezinvest.com";
        $website.innerText = "https://world.ezinvest.com";
        $website.setAttribute('href', 'https://world.ezinvest.com');
        $logoLink.setAttribute('href', 'https://world.ezinvest.com');
      } else {//EU
        let $textContent1 = document.querySelector("#content-text-first");
        let $textContent2 = document.querySelector("#content-text-second");
        let $websiteInput = document.querySelector("#input-address");
        let $website = document.querySelector("#address");
        let $logoLink = document.querySelector("#logo-link");
        $textContent1.innerText = "The Information contained in this email and any subsequent correspondence from WGM Services Ltd is private and is intended solely for the intended recipient(s). For those other than the recipient, any disclosure, copying, distribution, or any action taken or omitted to be taken in reliance on such information is prohibited and may be unlawful. If you have received this transmission in error please contact the sender.";
        $textContent2.innerText = "CFDs are complex instruments and come with a high risk of losing money rapidly due to leverage. 78.01% of retail investor accounts lose money when trading CFDs with this provider. You should consider whether you understand how CFDs work and whether you can afford to take the high risk of losing your money. EZ INVEST is a trading name of WGM Services Ltd, a Financial Services Company authorized and regulated by the Cyprus Securities Exchange Commission (CySEC) under licence no. 203/13. WGM Services Ltd is located at 11, Vyzantiou, 4th Floor, Strovolos 2064, Nicosia, Cyprus.";
        $websiteInput.value = "https://eu.ezinvest.com";
        $website.innerText = "https://eu.ezinvest.com";
        $website.setAttribute('href', 'https://eu.ezinvest.com');
        $logoLink.setAttribute('href', 'https://eu.ezinvest.com');
      }
    }
    else {
      let $target;
      if (fieldCollection.has(field)) {
        $target = fieldCollection.get(field);
      } else {
        $target = document.querySelector(`#${field}`);
        console.log('Target =>', $target);
        fieldCollection.set(field, $target);
      }

      const value = renderMethod[field]($input.value);

      $target.innerText = value;

      if (fieldNameMapping.email === field) {
        $target.setAttribute('href', `mailto:${value}`)
      }
    }
  }

  let copyTimer;
  function showCopyResult(success) {
    if (copyTimer) {
      window.clearTimeout(copyTimer);
    }

    const text = success ? 'Copied' : 'Failed';
    $status.innerText = text;

    if (!success) {
      $status.classList.add('failed');
    } else {
      $status.classList.remove('failed');
    }

    $status.classList.add('show');

    const waitTime = 3000;
    copyTimer = window.setTimeout(() => {
      $status.classList.remove('show');
      window.clearTimeout(copyTimer);
    }, waitTime);
  }

  function copyToClipboard(isHtml = false) {
    return () => {
      window.getSelection().empty();

      if (isHtml) {
        const htmlText = $present.innerHTML;
        const $hiddenInput = document.createElement('textarea');
        $hiddenInput.setAttribute('style', 'opacity: 0; width: 0; height: 0;');
        $hiddenInput.setAttribute('id', 'selectedInput');
        $hiddenInput.value = htmlText;
        document.body.appendChild($hiddenInput);
        $hiddenInput.select();
      } else {
        const selectedRange = document.createRange();
        selectedRange.selectNodeContents($present.querySelector('#container'));
        window.getSelection().addRange(selectedRange);
      }

      try {
        const result = document.execCommand('copy');
        showCopyResult(result);
      } catch(error) {
        console.error('[Copy]', error);
      } finally {
        window.getSelection().empty();

        if(isHtml) {
          const $hiddenInput = document.querySelector('#selectedInput');
          if ($hiddenInput) {
            document.body.removeChild($hiddenInput);
          }
        }
      }
    };
  }

  // Init
  Object.values(fieldNameMapping).forEach((field) => render(document.querySelector(`#input-${field}`)));
  $form.addEventListener('keyup', (evt) => console.log(evt) || render(evt.target));
  $form.addEventListener('change', (evt) => console.log(evt) || render(evt.target));

  document.querySelector('#copy-html-button').addEventListener('click', copyToClipboard(true));
  document.querySelector('#copy-text-button').addEventListener('click', copyToClipboard(false));
})();
