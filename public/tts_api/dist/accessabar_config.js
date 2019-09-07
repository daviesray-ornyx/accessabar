const accessabar = new Accessabar();

function playText() {
    const customElText = document.getElementById('custom-text').textContent;

    accessabar.speakText(customElText);
}

accessabar.open();
