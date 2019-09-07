function hideEditor() {
    const editorEl = document.getElementById('editor-container');
    const customEl = document.getElementById('custom-text');
    const playEl = document.getElementById('play-text');

    editorEl.style.display = 'none';
    customEl.classList.remove('hide');
    playEl.classList.remove('hide');
}

function showEditor() {
    const editorEl = document.getElementById('editor-container');
    const customEl = document.getElementById('custom-text');
    const playEl = document.getElementById('play-text');

    editorEl.style.display = 'block';
    customEl.classList.add('hide');
    playEl.classList.add('hide');
}

function updateContents() {
    const html = window.quillRuntime.root.innerHTML;
    const customTextEl = document.getElementById('custom-text');

    customTextEl.innerHTML = html;
}

function clearContents() {
    const customTextEl = document.getElementById('custom-text');

    customTextEl.innerHTML = '';
}

function init() {
    window.quillRuntime = new window.Quill('#editor', {
        placeholder: 'Enter custom text...',
        modules: {
            toolbar: [
                [{ header: [] }],
                ['bold', 'italic', 'underline', 'link'],
                [{ color: [] }, { background: [] }],
                [{ list: 'ordered' }, { list: 'bullet' }],
                ['clean'],
            ],
        },
        theme: 'snow',
    });

    const editButton = document.getElementById('edit-done');

    editButton.addEventListener('click', (event) => {
        const { target } = event;

        if (target.textContent === 'Done') {
            target.textContent = 'Edit';

            updateContents();
            hideEditor();
            return;
        }

        clearContents();
        showEditor();
        target.textContent = 'Done';
    });
}

init();
