import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Barrierefreiheit | Coffee4Money",
};

export default function BarrierefreiheitPage() {
    return (
        <article>
            <h1>Erklärung zur Barrierefreiheit</h1>
            <p>
                Coffee4Money ist bemüht, seine Website im Einklang mit den nationalen
                Rechtsvorschriften zur Umsetzung der Richtlinie (EU) 2016/2102 des
                Europäischen Parlaments und des Rates barrierefrei zugänglich zu machen.
            </p>

            <h2>Stand der Vereinbarkeit</h2>
            <p>
                Diese Website ist mit den geltenden Richtlinien für Barrierefreiheit
                weitestgehend vereinbar.
            </p>

            <h2>Maßnahmen</h2>
            <ul>
                <li>Verwendung von kontrastreichen Farben für Textelemente.</li>
                <li>Skalierbare Schriftgrößen.</li>
                <li>Alternative Texte für Bilder und Grafiken.</li>
                <li>Tastaturnavigation für interaktive Elemente.</li>
            </ul>

            <h2>Kontakt und Feedback</h2>
            <p>
                Sollten dir Mängel in Bezug auf die barrierefreie Gestaltung auffallen,
                kannst du dich jederzeit unter <strong>hello@coffee4money.de</strong> bei uns melden.
            </p>
        </article>
    );
}