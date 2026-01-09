import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Impressum | Coffee4Money",
    description: "Legal notice for Coffee4Money",
};

export default function ImpressumPage() {
    return (
        <article>
            <h1>Impressum</h1>

            <section className="mb-8">
                <h2>Angaben gemäß § 5 TMG</h2>
                <p>
                    Coffee4Money
                    <br />
                    Max Mustermann
                    <br />
                    Musterstraße 123
                    <br />
                    12345 Musterstadt
                </p>
            </section>

            <section className="mb-8">
                <h2>Kontakt</h2>
                <p>
                    Telefon: +49 (0) 123 44 55 66
                    <br />
                    E-Mail: hello@coffee4money.de
                </p>
            </section>

            <section className="mb-8">
                <h2>Redaktionell verantwortlich</h2>
                <p>
                    Max Mustermann
                    <br />
                    Musterstraße 123
                    <br />
                    12345 Musterstadt
                </p>
            </section>

            <section className="pt-8 mt-8 border-t border-stone-200 text-sm text-stone-500">
                <p>
                    <strong>Haftungsausschluss:</strong> Die Inhalte dieser Website wurden
                    mit größtmöglicher Sorgfalt erstellt. Für die Richtigkeit,
                    Vollständigkeit und Aktualität der Inhalte können wir jedoch keine
                    Gewähr übernehmen.
                </p>
            </section>
        </article>
    );
}