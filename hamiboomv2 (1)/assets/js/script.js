const someoneContainer = document.getElementById('someone-container'),
    someoneOptionBtn = document.getElementById('btn-opt-for-someone'),
    meOptionBtn = document.getElementById('btn-opt-for-me'),
    meContainer = document.getElementById('me-container'),
    landingPage = document.getElementById('landing-page'),
    selectionPage = document.getElementById('selection-page'),
    page1 = document.getElementById('page1'),
    page2 = document.getElementById('page2'),
    mainContainer = document.querySelector('.main-container');



const filloutPage = document.getElementById('fillout-page'),
    templates = document.querySelectorAll('.template-item'),
    backIcons = document.querySelectorAll('.back-icon'),
    someoneCreateBtn = document.getElementById('someone-create-btn'),
    someoneToInput = document.getElementById('someone-to-input'),
    someoneFromInput = document.getElementById('someone-from-input'),
    endPage = document.getElementById('end-page'),
    generatedImagePreview = document.getElementById('generated-image'),
    explodeText = document.getElementById('explode-text'),
    someoneDownloadBtn = document.getElementById('someone-download-btn'),
    someoneStartOverBtn = document.getElementById('someone-start-over-btn');

function createLetter(name) {
    return new Promise((resolve, reject) => {
        const _canvas = new fabric.Canvas('temp-canvas', {
            width: 1044,
            height: 1295
        });

        fabric.Image.fromURL('assets/images/me/blankletter.png', function (img) {
            _canvas.setBackgroundImage(img, function () {

                let observer = new FontFaceObserver('Cryaon');
                observer.load().then(() => {
                    const text = new fabric.Text(name, {
                        fontFamily: 'Cryaon',
                        fontSize: 80,
                        fill: 'black',
                        top: 229.63,
                        left: 328,
                        angle: 347,

                    });
                    _canvas.add(text);
                    _canvas.renderAll();
                    resolve(_canvas.toDataURL({
                        format: 'png',
                        quality: 1
                    }));
                });

            });
        });

    });

}

let currentTemplate = null,
    fromText, toText, canvas, generatedImage = null;

templates.forEach(template => {
    template.addEventListener('click', () => {
        currentTemplate = template.dataset.template;
        selectionPage.classList.add('d-none');
        filloutPage.classList.remove('d-none');
        initCanvas(currentTemplate);
        const canvasContainer = document.getElementById('canvas');
        canvasContainer.classList.remove('canvas-visible');
        requestAnimationFrame(() => canvasContainer.classList.add('canvas-visible'));
    });
});

backIcons.forEach(icon => {
    icon.addEventListener('click', () => {
        const page = icon.dataset.page;
        if (page === 'selection') {
            selectionPage.classList.remove('d-none');
            filloutPage.classList.add('d-none');
            document.getElementById('canvas').classList.remove('canvas-visible');
            currentTemplate = null;
            canvas.dispose();
            canvas = null;
            fromText = null;
            toText = null;
            someoneToInput.value = '';
            someoneFromInput.value = '';
        } else if (page === 'fill') {
            endPage.classList.add('d-none');
            filloutPage.classList.remove('d-none');
            initCanvas(currentTemplate);
            const canvasContainer = document.getElementById('canvas');
            canvasContainer.classList.remove('canvas-visible');
            requestAnimationFrame(() => canvasContainer.classList.add('canvas-visible'));
        } else if (page === 'landing') {
            landingPage.classList.remove('d-none');
            someoneContainer.classList.add('d-none');
        }
    });
});

function drawText(from = null, to = null) {

    if (from === null) {
        from = "Your Name";
    }

    if (to === null) {
        to = "Their Name";
    }

    if (currentTemplate === '1') {
        toText.setText(`To: ${to} <3`);
        fromText.setText(`From: ${from} :3`);
    } else if (currentTemplate === '2') {
        toText.getObjects().forEach(obj => {
            obj.set({
                text: `${to} <3`
            });
            obj.setCoords();
        });
        toText._calcBounds(true);

        toText.set({
            left: 26 + toText.getWidth() / 2,
            top: 123 + toText.getHeight() / 2,
            originX: 'center',
            originY: 'center'
        });

        fromText.setText(from);
    } else if (currentTemplate === '3') {
        toText.setText(`${to}!`);
        fromText.setText(`From: ${from}`);
    }

    canvas.renderAll();
}

function initTexts(templateId) {

    if (templateId === '1') {
        toText = new fabric.CurvedText('To: Their Name <3', {
            top: 230,
            textAlign: 'center',
            fill: '#ffffff',
            radius: 500,
            fontSize: 19,
            spacing: 0.2,
            fontFamily: 'WakuWaku',
            reverse: true,
            locked: true,
            selectable: false,
            originX: 'center'
        });

        fromText = new fabric.CurvedText('From: Your Name c:', {
            top: 252,
            textAlign: 'center',
            fill: '#ffffff',
            radius: 500,
            fontSize: 19,
            spacing: 0.5,
            fontFamily: 'WakuWaku',
            reverse: true,
            locked: true,
            selectable: false,
            originX: 'center'
        });
    } else if (templateId === '2') {

        const textOptions = {
            fontSize: 68,
            fontFamily: 'WakuWaku',
            scaleX: 0.3,
            scaleY: 0.3,
            originX: 'center',
            originY: 'center',
            left: 0,
            top: 0
        };

        // 1. Create the "Border" (Background)
        const borderText = new fabric.Text('', {
            ...textOptions,
            fill: 'transparent',
            stroke: '#fff',
            strokeWidth: 16,
            shadow: new fabric.Shadow({
                color: 'rgba(0, 0, 0, 0.3)',
                blur: 4,
                offsetX: 0,
                offsetY: 5
            })
        });

        const fillText = new fabric.Text('', {
            ...textOptions,
            fill: '#f1698e'
        });

        toText = new fabric.Group([borderText, fillText], {
            layout: 'fixed'
        });

        toText.set({
            left: 26 + toText.getWidth() / 2,
            top: 123 + toText.getHeight() / 2,
            originX: 'center',
            originY: 'center'
        });

        toText.setCoords();

        fromText = new fabric.Text('', {
            top: 187,
            left: 26,
            fill: '#ffffff',
            fontSize: 14,
            fontFamily: 'WakuWaku',
            reverse: true,
            locked: true,
            selectable: false,
        });

    } else if (templateId === '3') {
        toText = new fabric.Text('', {
            top: 155,
            fill: '#fff',
            fontSize: 22,
            fontFamily: 'WakuWaku',
            reverse: true,
            locked: true,
            selectable: false,
            originX: 'center',
        });

        fromText = new fabric.Text('', {
            top: 220,
            fill: '#fff',
            fontSize: 14,
            fontFamily: 'WakuWaku',
            reverse: true,
            locked: true,
            selectable: false,
            originX: 'center'
        });
    }


    canvas.add(toText, fromText);

    if (templateId === '1' || templateId === '3') {
        canvas.centerObjectH(toText);
        canvas.centerObjectH(fromText);
    }

    drawText();
}

function initCanvas(templateId) {
    canvas = new fabric.Canvas('fabricCanvas', {
        width: 300,
        height: 300
    });

    fabric.Image.fromURL(`assets/images/templates/base${templateId}.png`, function (img) {
        img.set({
            scaleX: canvas.width / img.width,
            scaleY: canvas.height / img.height
        });
        canvas.setBackgroundImage(img, function () {
            initTexts(templateId);
            canvas.renderAll();
        });
    });
}

someoneCreateBtn.addEventListener('click', () => {

    if (someoneFromInput.value.trim().length === 0 || someoneToInput.value.trim().length === 0) {
        return;
    }

    showLoading();

    drawText(someoneFromInput.value, someoneToInput.value);
    generatedImage = canvas.toDataURL({
        format: 'png',
        multiplier: 3,
        quality: 1
    });
    endPage.classList.remove('d-none');
    filloutPage.classList.add('d-none');
    document.getElementById('canvas').classList.remove('canvas-visible');
    canvas.dispose();
    canvas = null;
    fromText = null;
    toText = null;
    someoneToInput.value = '';
    someoneFromInput.value = '';
    generatedImagePreview.src = generatedImage;
});

explodeText.addEventListener('click', () => {

    const explodeContainer = document.getElementById('explode-container'),
        afterExplode = document.getElementById('after-explode'),
        explodeImage = document.getElementById('explode-image');

    someoneContainer.classList.add('d-none');
    explodeContainer.classList.remove('d-none');
    setTimeout(() => {
        explodeImage.remove();
        afterExplode.classList.remove('d-none');
    }, 790);
});

someoneDownloadBtn.addEventListener('click', () => {
    const downloadLink = document.createElement('a');
    downloadLink.href = generatedImage;
    downloadLink.download = 'hamiboom.png';
    downloadLink.click();
});

someoneStartOverBtn.addEventListener('click', () => {
    landingPage.classList.remove('d-none');
    someoneContainer.classList.add('d-none');
    selectionPage.classList.add('d-none');
    filloutPage.classList.add('d-none');
    endPage.classList.add('d-none');
    document.getElementById('canvas').classList.remove('canvas-visible');
    generatedImagePreview.src = '';
    generatedImage = null;
    fromText = null;
    toText = null;
    someoneToInput.value = '';
    someoneFromInput.value = '';
});

let typedReally;

meContainer.onclick = function (e) {
    if (e.target.id === 'me-back-icon' && meContainer.dataset.page === '1') {
        return;
    }

    if (e.target.classList.contains('reset-me-btn')) {
        return;
    }

    if (meContainer.dataset.page !== '1') {
        return;
    }

    if (isTyping) {
        return;
    }

    if (typedReally) {
        typedReally.destroy();
    }

    const page1Title = page1.querySelector('.textbox .title');
    const page2Title = page2.querySelector('.textbox .title');
    page1Title.classList.remove('title-visible');
    setTimeout(() => {
        page1.classList.add('d-none');
        page2.classList.remove('d-none');
        meContainer.dataset.page = '2';
        page2Title.classList.remove('title-visible');
        requestAnimationFrame(() => page2Title.classList.add('title-visible'));
    }, titleTransitionMs);

    typedReally = new Typed("#typed-really", {
        onComplete: () => {
        },
        strings: ['i really want to write<br>letter for you...'],
        typeSpeed: 50,
        startDelay: 0,
        loop: false,
        showCursor: false
    });
};

const page3 = document.getElementById('page3'),
    page4 = document.getElementById('page4'),
    meBackIcon = document.getElementById('me-back-icon'),
    nameInput = document.getElementById('name-input'),
    sendBtn = document.getElementById('send-btn'),
    letterSealed = document.getElementById('letter-sealed'),
    openLetter = document.getElementById('open-letter'),
    generatedLetterEl = document.getElementById('generated-letter');

const titleTransitionMs = 250;

meBackIcon.addEventListener('click', () => {
    if (meContainer.dataset.page === '1') {
        page1.querySelector('.textbox .title').classList.remove('title-visible');
        setTimeout(() => {
            meContainer.classList.add('d-none');
            landingPage.classList.remove('d-none');
        }, titleTransitionMs);
    } else if (meContainer.dataset.page === '2') {
        const page1Title = page1.querySelector('.textbox .title');
        const page2Title = page2.querySelector('.textbox .title');
        page2Title.classList.remove('title-visible');
        setTimeout(() => {
            page1.classList.remove('d-none');
            page2.classList.add('d-none');
            meContainer.dataset.page = '1';
            nameInput.value = '';
            page1Title.classList.remove('title-visible');
            requestAnimationFrame(() => page1Title.classList.add('title-visible'));
        }, titleTransitionMs);
    } else if (meContainer.dataset.page === '3') {
        page3.classList.add('d-none');
        page2.classList.remove('d-none');
        meContainer.dataset.page = '2';
    }
});

sendBtn.addEventListener('click', async () => {
    if (nameInput.value.length > 0) {
        showLoading();
        const letter = await createLetter(nameInput.value);
        generatedLetterEl.src = letter;
        page2.classList.add('d-none');
        page3.classList.remove('d-none');
        meContainer.dataset.page = '3';
        nameInput.value = '';
    }
});

letterSealed.addEventListener('click', () => {
    meBackIcon.classList.add('d-none');
    meContainer.classList.add('letter-transitioning');
    page4.classList.remove('d-none');
    generatedLetterEl.style.opacity = '0';
    document.body.style.overflow = 'hidden';
    openLetter.classList.add('letter-animate');

    requestAnimationFrame(() => {
        requestAnimationFrame(() => {
            letterSealed.style.opacity = '0';
            generatedLetterEl.style.opacity = '1';
        });
    });


    setTimeout(() => {
        meContainer.classList.remove('letter-transitioning');
        page3.classList.add('d-none');
        meContainer.dataset.page = '4';
        letterSealed.style.opacity = '';
        generatedLetterEl.style.opacity = '';
    }, 200);
});

someoneOptionBtn.addEventListener('click', () => {
    someoneContainer.classList.remove('d-none');
    landingPage.classList.add('d-none');
    selectionPage.classList.remove('d-none');
});

let isTyping = false,
    hiTyped;

meOptionBtn.addEventListener('click', () => {
    meContainer.classList.remove('d-none');
    landingPage.classList.add('d-none');
    const page1Title = page1.querySelector('.textbox .title');
    page1Title.classList.remove('title-visible');
    requestAnimationFrame(() => page1Title.classList.add('title-visible'));
    isTyping = true;
    document.querySelector('.press-anywhere').classList.add('d-none');
    if (hiTyped) {
        hiTyped.destroy();
    }

    hiTyped = new Typed("#typed-hi", {
        onComplete: () => {
            isTyping = false;
            document.querySelector('.press-anywhere').classList.remove('d-none');
        },
        strings: ['hiiiiiiiiiiiii!!!<br>happy to see you here!'],
        typeSpeed: 50,
        startDelay: 0,
        loop: false,
        showCursor: false
    });
});

function showLoading() {
    const loadingOverlay = document.getElementById('loading-overlay');
    const fadeDuration = 400;

    loadingOverlay.classList.remove('d-none');
    mainContainer.classList.add('d-none');

    requestAnimationFrame(() => {
        loadingOverlay.classList.add('visible');
    });

    setTimeout(() => {
        loadingOverlay.classList.remove('visible');
        setTimeout(() => {
            loadingOverlay.classList.add('d-none');
            mainContainer.classList.remove('d-none');
        }, fadeDuration);
    }, 1500);
}

function resetMeContainer() {
    page1.classList.remove('d-none');
    page2.classList.add('d-none');
    page3.classList.add('d-none');
    page4.classList.add('d-none');
    page1.querySelector('.textbox .title').classList.remove('title-visible');
    page2.querySelector('.textbox .title').classList.remove('title-visible');
    landingPage.classList.remove('d-none');
    meContainer.classList.add('d-none');
    meContainer.dataset.page = '1';
    nameInput.value = '';
    document.body.style.overflow = null;
    document.body.style.overflowX = 'hidden';
    meBackIcon.classList.remove('d-none');
}

document.querySelectorAll('.reset-me-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        resetMeContainer();
    });
});