<?php

namespace App\Services;

use DOMDocument;
use DOMElement;
use DOMXPath;

class SvgTextEditor
{
    private const SVG_NS = 'http://www.w3.org/2000/svg';

    public const DEFAULT_FONT_FAMILY = 'Arial, sans-serif';

    public const DEFAULT_FILL = 'rgb(55, 65, 81)';

    private static function decode(string $svgContent): string
    {
        $bom = substr($svgContent, 0, 2);
        if ($bom !== "\xFF\xFE" && $bom !== "\xFE\xFF") {
            return $svgContent;
        }
        $decoded = mb_convert_encoding($svgContent, 'UTF-8', 'UTF-16');
        // The XML declaration still claims UTF-16 — rewrite so DOMDocument
        // doesn't reject the now-UTF-8 byte stream.
        return preg_replace('/encoding=("|\')UTF-16("|\')/i', 'encoding="UTF-8"', $decoded, 1) ?? $decoded;
    }

    /**
     * Extract the text content of each <text> element in document order.
     *
     * @return string[]
     */
    public static function extractTexts(string $svgContent): array
    {
        $dom = self::loadDom($svgContent);
        if (! $dom) {
            return [];
        }

        $texts = [];
        foreach (self::textNodes($dom) as $node) {
            $texts[] = self::collapseWhitespace($node->textContent);
        }

        return $texts;
    }

    /**
     * Render the SVG with text overrides applied. Font/fill are NOT normalized
     * by default — pass non-null $fontFamily / $fill to force them (caller's
     * choice), but be aware that intentional visual styling baked into the
     * source SVG (different colors per group, etc.) will be flattened.
     *
     * @param  string[]  $overrides  Indexed list parallel to extractTexts() ordering.
     *                               Empty/null entries leave the original text unchanged.
     */
    public static function render(
        string $svgContent,
        array $overrides = [],
        ?string $fontFamily = null,
        ?string $fill = null,
    ): string {
        $dom = self::loadDom($svgContent);
        if (! $dom) {
            return $svgContent;
        }

        $i = 0;
        foreach (self::textNodes($dom) as $text) {
            $override = $overrides[$i] ?? null;
            if (is_string($override) && $override !== '') {
                self::replaceText($text, $override);
            }
            if ($fontFamily !== null) {
                $text->setAttribute('font-family', $fontFamily);
                self::stripDescendantAttr($text, 'font-family');
            }
            if ($fill !== null) {
                $text->setAttribute('fill', $fill);
                self::stripDescendantAttr($text, 'fill');
                // Inline style="fill:..." trumps the fill attribute — strip those too.
                self::stripInlineStyleFill($text);
                foreach (self::descendants($text) as $desc) {
                    self::stripInlineStyleFill($desc);
                }
            }
            $i++;
        }

        return $dom->saveXML() ?: $svgContent;
    }

    private static function loadDom(string $svgContent): ?DOMDocument
    {
        $svgContent = self::decode($svgContent);

        $dom = new DOMDocument('1.0', 'UTF-8');
        $dom->preserveWhiteSpace = true;
        $dom->formatOutput = false;

        $previous = libxml_use_internal_errors(true);
        $ok = $dom->loadXML($svgContent, LIBXML_NONET | LIBXML_BIGLINES);
        libxml_clear_errors();
        libxml_use_internal_errors($previous);

        return $ok ? $dom : null;
    }

    /**
     * @return iterable<DOMElement>
     */
    private static function textNodes(DOMDocument $dom): iterable
    {
        $xpath = new DOMXPath($dom);
        $xpath->registerNamespace('svg', self::SVG_NS);

        // Match both namespaced and unnamespaced <text>.
        $nodes = $xpath->query('//svg:text | //text');
        if (! $nodes) {
            return [];
        }

        $out = [];
        foreach ($nodes as $node) {
            if ($node instanceof DOMElement) {
                $out[] = $node;
            }
        }

        return $out;
    }

    private static function replaceText(DOMElement $element, string $newText): void
    {
        while ($element->firstChild) {
            $element->removeChild($element->firstChild);
        }
        $element->appendChild($element->ownerDocument->createTextNode($newText));
    }

    private static function stripDescendantAttr(DOMElement $element, string $attr): void
    {
        foreach (self::descendants($element) as $desc) {
            if ($desc->hasAttribute($attr)) {
                $desc->removeAttribute($attr);
            }
        }
    }

    private static function stripInlineStyleFill(DOMElement $element): void
    {
        if (! $element->hasAttribute('style')) {
            return;
        }
        $style = $element->getAttribute('style');
        $cleaned = preg_replace('/\bfill\s*:[^;]*;?/i', '', $style);
        $cleaned = trim((string) $cleaned, " \t;");
        if ($cleaned === '') {
            $element->removeAttribute('style');
        } else {
            $element->setAttribute('style', $cleaned);
        }
    }

    /**
     * @return iterable<DOMElement>
     */
    private static function descendants(DOMElement $element): iterable
    {
        $out = [];
        $stack = [$element];
        while ($stack) {
            $current = array_pop($stack);
            foreach ($current->childNodes as $child) {
                if ($child instanceof DOMElement) {
                    $out[] = $child;
                    $stack[] = $child;
                }
            }
        }

        return $out;
    }

    private static function collapseWhitespace(string $value): string
    {
        $normalized = preg_replace('/\s+/u', ' ', $value);

        return trim((string) $normalized);
    }
}
