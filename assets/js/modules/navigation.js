// Navigation Module
const backBtn = document.getElementById('backBtn');
const views = {
    home: document.getElementById('home-view'),
    mode: document.getElementById('mode-selection-view'),
    custom: document.getElementById('custom-setup-view'),
    timer: document.getElementById('timer-view')
};

let currentView = 'home';

export function initNavigation(onBackToMode) {
    const mainStartBtn = document.getElementById('mainStartBtn');
    
    mainStartBtn.addEventListener('click', () => switchView('mode', 'forward'));

    backBtn.addEventListener('click', () => {
        if (currentView === 'timer') {
            onBackToMode();
            switchView('mode', 'backward');
        } else if (currentView === 'custom') {
            switchView('mode', 'backward');
        } else if (currentView === 'mode') {
            switchView('home', 'backward');
        }
    });
}

export function switchView(targetView, direction = 'forward') {
    const outAnim = direction === 'forward' ? 'slide-out' : 'slide-out-right';
    const inAnim = direction === 'forward' ? 'slide-in' : 'slide-in-left';

    const currentEl = views[currentView];
    const targetEl = views[targetView];

    document.body.classList.add(outAnim);

    setTimeout(() => {
        currentEl.style.display = 'none';
        targetEl.style.display = 'flex';
        
        backBtn.style.display = targetView === 'home' ? 'none' : 'block';

        document.body.classList.remove(outAnim);
        document.body.classList.add(inAnim);
        
        currentView = targetView;

        setTimeout(() => {
            document.body.classList.remove(inAnim);
        }, 600);
    }, 600);
}

export function getCurrentView() {
    return currentView;
}
