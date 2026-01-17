/**
 * Utility function for smooth scrolling to an element
 * @param selector - CSS selector of the target element (e.g., '#calculator')
 * @param offset - Optional offset in pixels from the top
 */
export const smoothScrollToElement = (selector: string, offset: number = 0) => {
    const element = document.querySelector(selector);
    if (element) {
        const targetPosition = element.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({
            top: targetPosition,
            behavior: 'smooth',
        });
    }
};
