const queryAll = document.querySelectorAll.bind(document);
const query = document.querySelector.bind(document);
const formatBtns = queryAll(".editor-container .options button");
const editor = query("#editor");
const headerSelect = query(".editor-container #header-select");

const execCommand = (e) => {
    const target = e.currentTarget;
    const command = target.dataset.command;
    const selection = document.getSelection();

    if (selection.rangeCount > 0) {
        switch (command) {
            case "createLink":
                const url = prompt("Enter url");

                document.execCommand("createLink", false, url);
                break;

            case "undo":
            case "redo":
                document.execCommand(command);
                break;

            default:
                document.execCommand(command);
                target.classList.toggle("active");
        }
    }
};

const initialize = () => {
    editor.addEventListener("keypress", (e) => {
        const selection = document.getSelection();
        const range = selection.getRangeAt(0);
        const paragraph = document.createElement("p");
        const hasFirstChild = Boolean(editor.firstChild);

        if (range.commonAncestorContainer.isSameNode(e.target)) {
            if (hasFirstChild) {
                while (editor.firstChild) {
                    paragraph.append(editor.firstChild);
                    editor.firstChild.remove();
                }
            } else {
                paragraph.append(document.createTextNode("\u200b"));
            }

            range.insertNode(paragraph);
            range.setStart(paragraph, 0);
            range.collapse(true);
            selection.removeAllRanges();
            selection.addRange(range);
        }
    });

    headerSelect.addEventListener("change", (e) => {
        const tagname = e.target.value;
        const selection = document.getSelection();
        const range = selection.getRangeAt(0);
        const heading = document.createElement(tagname);

        if (selection.rangeCount > 0) {
            if (!range.collapsed) {
                range.surroundContents(heading);
            } else {
                heading.append(document.createTextNode("\u200b"));
                editor.append(heading);
                range.setStart(heading, 0);
                range.collapse(true);
                selection.removeAllRanges();
                selection.addRange(range);
            }
        }
    });

    formatBtns.forEach((button) =>
        button.addEventListener("click", execCommand)
    );

    document.addEventListener("selectionchange", () => {
        const selection = document.getSelection();
        const range = selection.getRangeAt(0);
        const parent = range.commonAncestorContainer.parentElement;
        const isBold = parent.closest("strong, b");
        const isItalic = parent.closest("i, em");
        const isUnderline = parent.closest("u");
        const isStrike = parent.closest("strike");
        const isSuperscript = parent.closest("sup");
        const isSubscript = parent.closest("sub");
        const isOrderedList = parent.closest("ol");
        const isUnorderedList = parent.closest("ul");
        const isHeader = parent.closest("h1, h2, h3, h4, h5, h5");
        const isIndented = parent.closest("blockquote");

        const isCentered =
            parent.closest("div").computedStyleMap().get("text-align").value ===
            "center";

        const isJustified =
            parent.closest("div").computedStyleMap().get("text-align").value ===
            "justify";

        const isRightAligned =
            parent.closest("div").computedStyleMap().get("text-align").value ===
            "right";

        const isLeftAligned =
            parent.closest("div").computedStyleMap().get("text-align").value ===
            "start";

        isHeader
            ? (headerSelect.value = isHeader.tagName.toLowerCase())
            : (headerSelect.value = "p");

        isBold
            ? query(
                  ".editor-container button[data-command='bold']"
              ).classList.add("active")
            : query(
                  ".editor-container button[data-command='bold']"
              ).classList.remove("active");

        isItalic
            ? query(
                  ".editor-container button[data-command='italic']"
              ).classList.add("active")
            : query(
                  ".editor-container button[data-command='italic']"
              ).classList.remove("active");

        isUnderline
            ? query(
                  ".editor-container button[data-command='underline']"
              ).classList.add("active")
            : query(
                  ".editor-container button[data-command='underline']"
              ).classList.remove("active");

        isStrike
            ? query(
                  ".editor-container button[data-command='strikeThrough']"
              ).classList.add("active")
            : query(
                  ".editor-container button[data-command='strikeThrough']"
              ).classList.remove("active");

        isSubscript
            ? query(
                  ".editor-container button[data-command='subscript']"
              ).classList.add("active")
            : query(
                  ".editor-container button[data-command='subscript']"
              ).classList.remove("active");

        isSuperscript
            ? query(
                  ".editor-container button[data-command='superscript']"
              ).classList.add("active")
            : query(
                  ".editor-container button[data-command='superscript']"
              ).classList.remove("active");

        isOrderedList
            ? query(
                  ".editor-container button[data-command='insertOrderedList']"
              ).classList.add("active")
            : query(
                  ".editor-container button[data-command='insertOrderedList']"
              ).classList.remove("active");

        isUnorderedList
            ? query(
                  ".editor-container button[data-command='insertUnorderedList']"
              ).classList.add("active")
            : query(
                  ".editor-container button[data-command='insertUnorderedList']"
              ).classList.remove("active");

        isRightAligned
            ? query(
                  ".editor-container button[data-command='justifyRight']"
              ).classList.add("active")
            : query(
                  ".editor-container button[data-command='justifyRight']"
              ).classList.remove("active");

        isLeftAligned
            ? query(
                  ".editor-container button[data-command='justifyLeft']"
              ).classList.add("active")
            : query(
                  ".editor-container button[data-command='justifyLeft']"
              ).classList.remove("active");

        isCentered
            ? query(
                  ".editor-container button[data-command='justifyCenter']"
              ).classList.add("active")
            : query(
                  ".editor-container button[data-command='justifyCenter']"
              ).classList.remove("active");

        isJustified
            ? query(
                  ".editor-container button[data-command='justifyFull']"
              ).classList.add("active")
            : query(
                  ".editor-container button[data-command='justifyFull']"
              ).classList.remove("active");

        isIndented
            ? query(
                  ".editor-container button[data-command='indent']"
              ).classList.add("active")
            : query(
                  ".editor-container button[data-command='indent']"
              ).classList.remove("active");
    });
};

window.addEventListener("DOMContentLoaded", initialize);
