// Theme Module
const DEFAULT_BG = '#8b3b08';
const STORAGE_KEY = 'pomoflow-bg-color';

export function initTheme() {
    const saved = localStorage.getItem(STORAGE_KEY) || DEFAULT_BG;
    applyTheme(saved);

    const colorPickerBtn = document.getElementById('colorPickerBtn');
    const colorPickerInput = document.getElementById('colorPickerInput');

    colorPickerBtn.addEventListener('click', () => colorPickerInput.click());

    colorPickerInput.addEventListener('input', (e) => {
        applyTheme(e.target.value);
        localStorage.setItem(STORAGE_KEY, e.target.value);
    });
}

function applyTheme(hex) {
    const root = document.documentElement;
    const { textColor, buttonShadow, shadowDark, overlayBg } = deriveColors(hex);

    root.style.setProperty('--bg-color', hex);
    root.style.setProperty('--text-color', textColor);
    root.style.setProperty('--button-shadow', buttonShadow);
    root.style.setProperty('--shadow-dark', shadowDark);
    root.style.setProperty('--overlay-bg', overlayBg);

    const colorPickerInput = document.getElementById('colorPickerInput');
    if (colorPickerInput) colorPickerInput.value = hex;

    const colorPreview = document.getElementById('colorPreview');
    if (colorPreview) colorPreview.style.backgroundColor = hex;
}

function deriveColors(hex) {
    const [h, s, l] = hexToHsl(hex);
    const isDark = l < 0.5;

    let textL, textS, shadowL, shadowS, darkL;

    if (isDark) {
        textL  = Math.min(l + 0.42, 0.88);
        textS  = Math.max(s - 0.20, 0.15);
        shadowL = Math.min(l + 0.22, 0.65);
        shadowS = Math.max(s - 0.10, 0.20);
        darkL  = Math.max(l - 0.12, 0.05);
    } else {
        textL  = Math.max(l - 0.42, 0.12);
        textS  = Math.max(s - 0.20, 0.15);
        shadowL = Math.max(l - 0.22, 0.25);
        shadowS = Math.max(s - 0.10, 0.20);
        darkL  = Math.max(l - 0.28, 0.08);
    }

    return {
        textColor:    hslToHex(h, textS, textL),
        buttonShadow: hslToHex(h, shadowS, shadowL),
        shadowDark:   hslToHex(h, s, darkL),
        overlayBg:    hexToRgba(hex, 0.8),
    };
}

function hexToHsl(hex) {
    let r = parseInt(hex.slice(1, 3), 16) / 255;
    let g = parseInt(hex.slice(3, 5), 16) / 255;
    let b = parseInt(hex.slice(5, 7), 16) / 255;

    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    let h, s;
    const l = (max + min) / 2;

    if (max === min) {
        h = s = 0;
    } else {
        const d = max - min;
        s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
        switch (max) {
            case r: h = ((g - b) / d + (g < b ? 6 : 0)) / 6; break;
            case g: h = ((b - r) / d + 2) / 6; break;
            case b: h = ((r - g) / d + 4) / 6; break;
        }
    }
    return [h, s, l];
}

function hslToHex(h, s, l) {
    let r, g, b;
    if (s === 0) {
        r = g = b = l;
    } else {
        const hue2rgb = (p, q, t) => {
            if (t < 0) t += 1;
            if (t > 1) t -= 1;
            if (t < 1 / 6) return p + (q - p) * 6 * t;
            if (t < 1 / 2) return q;
            if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
            return p;
        };
        const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
        const p = 2 * l - q;
        r = hue2rgb(p, q, h + 1 / 3);
        g = hue2rgb(p, q, h);
        b = hue2rgb(p, q, h - 1 / 3);
    }
    return '#' + [r, g, b]
        .map(x => Math.round(x * 255).toString(16).padStart(2, '0'))
        .join('');
}

function hexToRgba(hex, alpha) {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}
