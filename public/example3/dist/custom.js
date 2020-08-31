function hideEditor() {
    const editorEl = document.getElementById('editor-container');

    editorEl.style.display = 'none';
}

function showEditor() {
    const editorEl = document.getElementById('editor-container');

    editorEl.style.display = 'block';
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
