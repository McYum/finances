import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Datenschutz | Coffee4Money",
};

export default function DatenschutzPage() {
    return (
        <article>
            <h1>Datenschutz</h1>
            <p>
                Wir nehmen den Schutz deiner persönlichen Daten sehr ernst. Wir
                behandeln deine personenbezogenen Daten vertraulich und entsprechend der
                gesetzlichen Datenschutzvorschriften.
            </p>

            <h2>1. Datenerfassung auf unserer Website</h2>
            <h3>Newsletter</h3>
            <p>
                Wenn du den auf der Website angebotenen Newsletter beziehen möchtest,
                benötigen wir von dir eine E-Mail-Adresse. Diese Daten verwenden wir
                ausschließlich für den Versand der angeforderten Informationen. Die
                Verarbeitung erfolgt auf Grundlage deiner Einwilligung (Art. 6 Abs. 1
                lit. a DSGVO). Du kannst diese Einwilligung jederzeit widerrufen.
            </p>

            <h2>2. Hosting</h2>
            <p>
                Wir hosten unsere Website bei einem externen Dienstleister (z.B. Vercel).
                Die personenbezogenen Daten, die auf dieser Website erfasst werden,
                werden auf den Servern des Hosters gespeichert.
            </p>

            <h2>3. Deine Rechte</h2>
            <p>
                Du hast jederzeit das Recht auf unentgeltliche Auskunft über deine
                gespeicherten personenbezogenen Daten, deren Herkunft und Empfänger und
                den Zweck der Datenverarbeitung sowie ein Recht auf Berichtigung oder
                Löschung dieser Daten.
            </p>
        </article>
    );
}