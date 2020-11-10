export class Tool {

    createEl(obj) {

        if (typeof obj == 'object') {
            let element
            // Create El
            let {
                el,
                name,
                className,
                id,
                attr,
                style,
                append: toAppend,
                content,
                callback,
                listener
            } = obj;

            // For images and inputs and links

            let {
                src,
                type,
                href,
                value,
                data
            } = obj

            // EL

            element = el ? document.createElement(el) : false
            className ? this.addClass(element, className) : false
            id ? this.addId(element, id) : false
            attr ? this.setAttr(element, attr) : false
            style ? this.addStyles(element, style) : false
            toAppend ? this.append(element, toAppend) : false
            listener ? this.addListener(element, listener) : false
            content ? this.addContent(element, content) : false

            data ? this.setAttr(element, {
                data
            }) : false

            value ? this.setAttr(element, {
                value
            }) : false
            name ? this.setAttr(element, {
                name
            }) : false

            src ? this.setAttr(element, {
                src
            }) : false

            type ? this.setAttr(element, {
                type
            }) : false

            href ? this.setAttr(element, {
                href
            }) : false

            callback ? (callback(element, obj)) : false

            return element
        } else {
            return document.createElement(obj)
        }

    }

    addContent(element, content) {
        return typeof content == 'string' ? element.innerHTML = content : this.append(element, content)
    }

    addClass(element, className) {
        if (typeof className == 'string') {
            return element && className ? element.classList.add(className) : false
        } else if (Array.isArray(className)) {
            className.forEach(Cn => {
                element.classList.add(Cn)
            })
        }
    }

    removeClass(element, className) {
        if (typeof className == 'string') {
            return element && className ? element.classList.remove(className) : false
        } else if (Array.isArray(className)) {
            className.forEach(Cn => {
                element.classList.remove(Cn)
            })
        }
    }

    addId(element, Id) {
        return element && Id ? element.setAttribute('id', Id) : false
    }

    setAttr(element, attr) {

        Object.entries(attr).forEach(pair => {
            pair[0] = pair[0].includes('_') ? pair[0].replace('_', '-') : pair[0]
            element.setAttribute(pair[0], pair[1])
        })

        return true
    }

    getAttr(element, attr) {
        return element && attr ? element.getAttribute(attr) : false
    }

    addStyles(element, style) {

        if (typeof style == 'object') {

            Object.entries(style).forEach(pair => {

                pair[0] = pair[0].includes('_') ? pair[0].replace('_', '-') : pair[0]

                element.style[pair[0]] = pair[1]
            })

        }

    }

    addListener(element, listener) {
        Object.entries(listener).forEach(event => {
            element.addEventListener(event[0], event[1])
        })
    }

    append(element, append) {

        if (typeof append == 'object') {
            if (Array.isArray(append)) {
                append.forEach(toAppend => {
                    if (Array.isArray(toAppend)) {
                        toAppend.forEach(app => {
                            if (app) {
                                element.appendChild(app)
                            }
                        })
                    } else if (typeof toAppend == 'object') {
                        if (toAppend) {
                            element.appendChild(toAppend)
                        }
                    } else {
                        if (toAppend) {
                            element.innerHTML = toAppend
                        }
                    }
                })
            } else {
                try {
                    element.appendChild(append)
                } catch (error) {}
                try {
                    Object.entries(append).forEach(toAppend => {
                        try {
                            element.appendChild(toAppend)
                        } catch (error) {}
                        try {
                            element.appendChild(toAppend)
                        } catch (error) {}
                        try {
                            toAppend.forEach(AppendToAppend => {
                                element.appendChild(AppendToAppend)
                            })
                        } catch (error) {}
                    })
                } catch (error) {}
            }
        } else {
            element.innerHTML = append
        }

    }

    getEl(element) {
        if (typeof element == 'object') {
            return element
        } else if (typeof element == 'string') {
            return document.querySelector(element)
        }
    }

    getAllEl(element) {
        if (typeof element == 'object') {
            return element
        } else if (typeof element == 'string') {
            return document.querySelectorAll(element)
        }
    }

    getById(element) {
        if (typeof element == 'object') {
            return element
        } else if (typeof element == 'string') {
            return document.getElementById(element)
        }
    }

    getByClassName(element) {
        if (typeof element == 'object') {
            return element
        } else if (typeof element == 'string') {
            return document.getElementsByClassName(element)
        }
    }

    getUrlParam(PARAM) {
        let url, params = {};
        url = window.location.href;
        url = url.replace(`${window.location.origin}${window.location.pathname}?`, '')

        url.split('&').forEach(pair => {
            pair = pair.split('=');
            params[pair[0]] = pair[1]
        })

        if (!PARAM) return params

        return params[PARAM] ? params[PARAM] : false
    }

    addUrlParam(param) {

        let url = '?';

        if (typeof param == 'object') {

            let obj = Object.entries(param);

            for (let i = 0; i < obj.length; i++) {

                if (!obj[i][1]) return false

                url += `${obj[i][0]}=${obj[i][1]}`

                if (i == 0) {

                    if (obj.length != 1) {
                        url += '&'
                    }

                } else {

                    if (i != obj.length - 1) {
                        url += '&'
                    }

                }
            }
        }

        this.changeurl(url)
    }

    appendUrlParam(param) {
        let currentParam = getUrlParam()

        Object.entries(param).forEach(pair => {
            currentParam[pair[0]] = pair[1]
        })

        this.addUrlParam(currentParam)
    }

    removeUrlParam(param) {
        let currentParam = getUrlParam(),
            par = {}

        Object.entries(currentParam).forEach(pair => {
            if (pair[0] != param) {
                par[pair[0]] = pair[1]
            }
        })
        this.addUrlParam(par)
    }

    changeurl(...Args) {
        let url = Args[0],
            title = Args[1]
        if (url != '?') {
            history.pushState(null, title, url)
        }
    }

    getFileNameinUrl() {
        let url, params = {};
        url = window.location.href;
        url = url.replace(`${window.location.origin}/datamex/`, '')
        url = url.split('?')
        url = url[0].replace('.php', '')

        return url;
    }


    getJSON(file, callback) {
        let http = new XMLHttpRequest();
        http.overrideMimeType("application/json");

        http.open("GET", file, true);

        http.onreadystatechange = function () {
            if (http.readyState === 4 && http.status == "200") {
                callback(JSON.parse(http.responseText));
            }
        }
        http.send(null);
    }

    Ajax(Request) {

        let {
            url,
            type,
            method,
            data,
            success,
            failure
        } = Request
        let http = new XMLHttpRequest();

        http.open(method || type, url, true);

        http.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');

        http.onreadystatechange = function () {

            if (http.readyState == 4 && http.status == 200) {
                success(http.responseText);
            }

            if (http.status == 404) {
                failure ? failure(http.responseText) : false
                return false
            }

        }

        http.send(data);

    }

    FormDataToString(form) {
        return new URLSearchParams(Array.from(new FormData(form))).toString()
    }

    ObjToPhpData(obj) {

        let key, val, res = '';

        key = Object.keys(obj);

        val = Object.values(obj);

        for (let i = 0; i < key.length; i++) {

            res += key[i] + "=" + val[i];

            res += i != key.length - 1 ? "&" : "";

        }

        return res
    }

    phpDataToObj(data) {

        if (data) {
            let obj = {},
                split = data.split('&')

            split.forEach(pair => {
                let another = pair.split('=')
                another[1] = another[1].includes('+%23') ? another[1].replace('+%23', ' #') : another[1]
                obj[another[0]] = another[1]
            })

            return obj
        } else {
            return false
        }
    }

    file_get_contents(filename, callback) {
        fetch(filename).then((resp) => resp.text()).then(function (data) {
            callback(data)
        });
    }

    DrgToScroll(element) {

        let pos = {
            top: 0,
            left: 0,
            x: 0,
            y: 0
        };

        const mouseDownHandler = function (e) {

            element.style.userSelect = 'none';
            element.style.cursor = 'dragging'

            pos = {
                left: element.scrollLeft,
                top: element.scrollTop,
                // Get the current mouse position
                x: e.clientX,
                y: e.clientY,
            };

            document.addEventListener('mousemove', mouseMoveHandler);
            document.addEventListener('mouseup', mouseUpHandler);
        };

        const mouseMoveHandler = function (e) {

            // How far the mouse has been moved
            const dx = e.clientX - pos.x;
            const dy = e.clientY - pos.y;

            // Scroll the element
            element.scrollTop = pos.top - dy;
            element.scrollLeft = pos.left - dx;

        };

        const mouseUpHandler = function () {
            element.style.removeProperty('user-select');

            document.removeEventListener('mousemove', mouseMoveHandler);
            document.removeEventListener('mouseup', mouseUpHandler);
        };

        // Attach the handler
        element.addEventListener('mousedown', mouseDownHandler);
    }

    getUndefinedProp(element) {
        return properties = window.getComputedStyle(element, null);
    }

    UpperCaseFirstLetter(word) {
        if (word && word.length) {
            let First, Other, Length, result
            Length = word.length
            First = word.substr(0, 1)
            First = First.toUpperCase()
            Other = word.substr(1, Length)
            result = `${First}${Other}`

            return result
        }
    }

    scopeArray(Arr, value, callback) {
        let index = Arr.indexOf(value),
            res = false;
        if (Arr.includes(value)) {
            Arr.splice(index, 1)
            res = false
        } else {
            Arr.push(value)
            res = true
        }

        return callback ? callback(res) : res
    }

    toggleStyle(element, style, toggle, toToggle) {
        if (Array.isArray(element)) {
            element.forEach(element => {
                let Styles = window.getComputedStyle(element, null),
                    Style = Styles[style]

                if (Style == toggle) {
                    element.style[style] = toToggle;
                } else {
                    element.style[style] = toggle;
                }
            })
        } else {
            let Styles = window.getComputedStyle(element, null),
                Style = Styles[style]

            if (Style == toggle) {
                element.style[style] = toToggle;
            } else {
                element.style[style] = toggle;
            }
        }
    }

    toggleHasClass(element, ClassName) {
        return element && ClassName ? element.classList.contains(ClassName) ? element.classList.remove(ClassName) : element.classList.add(ClassName) : false
    }

    toggleClass(element, ClassName1, ClassName2) {
        return element && ClassName1 && ClassName2 ? element.classList.contains(ClassName1) ? (() => {
            element.classList.add(ClassName2)
            element.classList.remove(ClassName1)
        })() : (() => {
            element.classList.add(ClassName1)
            element.classList.remove(ClassName2)
        })() : false
    }

    isJSONValid(json) {
        try {
            JSON.parse(json);
        } catch (e) {
            return false;
        }
        return true;
    }

    getStyle(element, style) {
        let Styles = window.getComputedStyle(element, null)
        return style ? Styles[style] : Styles
    }

    styleOnAllElements(elements, style) {
        elements.forEach(element => {
            this.addStyles(element, style)
        })
    }

    styleOnAllElementsButNotMe(elements, me, style) {

        let generatesStylesBackup = {}

        Object.entries(style).forEach(pair => generatesStylesBackup[pair[0]] = getStyle(me, pair[0]))

        elements.forEach(element => {
            this.addStyles(element, style)
        })

        this.addStyles(me, generatesStylesBackup)

    }

    removeClassOnElementsButNotMine(elements, me, className) {
        elements.forEach(el => {
            el.classList.remove(className)
        })
        me.classList.add(className)
    }

    getSelectionText() {
        var text = "";
        if (window.getSelection) {
            text = window.getSelection().toString();
        } else if (document.selection && document.selection.type != "Control") {
            text = document.selection.createRange().text;
        }
        return text
    }


    controlCaseArr(arr, option) {
        let newArr = []
        arr.forEach(val => {
            option == 'lower' ? newArr.push(val.toLowerCase()) : newArr.push(val.toUpperCase())
        })
        return newArr;
    }

    controlArr(arr, current, controler) {
        let res = current
        arr.forEach((value, index) => {
            if (value == current) {
                res = controler == 'next' ? arr[index + 1] ? arr[index + 1] : arr[0] : controler == 'prev' ? arr[index - 1] ? arr[index - 1] : arr[arr.length - 1] : value
            }
        })
        return res;
    }

    LetterControl(letter, option) {
        let UpperCaseletters = ['-A', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'],
            LowerCaseLetters = this.controlCaseArr(UpperCaseletters, 'lower'),
            result, eq;

        for (let i = 0; i < UpperCaseletters.length; i++) {

            if (letter === UpperCaseletters[i]) {

                eq = option == 'next' ? i + 1 : i - 1;

                result = UpperCaseletters[eq]

            }

        }
        for (let i = 0; i < LowerCaseLetters.length; i++) {

            if (letter === LowerCaseLetters[i]) {

                eq = option == 'next' ? i + 1 : i - 1;

                result = LowerCaseLetters[eq]

            }

        }
        return result
    }


    getCircularReplacer() {

        const seen = new WeakSet();

        return (key, value) => {

            if (typeof value === "object" && value !== null) {

                if (seen.has(value)) {
                    return;
                }

                seen.add(value)
            }

            return value
        }

    }
}