<?php

namespace App\Http\Controllers;

use App\Models\Commitment;
use App\Models\DonationItem;
use App\Models\MediaItem;
use App\Models\NewsPost;
use App\Models\OpportunityListing;
use App\Models\ResilienceItem;
use App\Models\StrategicPriorityCard;
use App\Models\StrategicPriorityPage;
use Illuminate\Http\Request;
use Inertia\Inertia;

class SearchController extends Controller
{
    private const PER_GROUP = 8;

    public function search(Request $request)
    {
        $q = trim((string) $request->query('q', ''));
        $groups = [];

        if (mb_strlen($q) >= 2) {
            $like = '%'.str_replace(['\\', '%', '_'], ['\\\\', '\\%', '\\_'], $q).'%';

            $this->push($groups, 'News & Announcements', $this->news($like));
            $this->push($groups, 'Opportunities', $this->opportunities($like));
            $this->push($groups, 'Our Commitment', $this->commitments($like));
            $this->push($groups, 'Strategic Priorities', $this->strategic($like));
            $this->push($groups, 'Donate', $this->donate($like));
            $this->push($groups, 'Media', $this->media($like));
            $this->push($groups, "VDO's Resilience", $this->resilience($like));
        }

        return Inertia::render('search', [
            'q' => $q,
            'groups' => $groups,
            'totalCount' => array_sum(array_map(fn ($g) => count($g['items']), $groups)),
        ]);
    }

    private function push(array &$groups, string $label, array $items): void
    {
        if (empty($items)) return;
        $groups[] = ['label' => $label, 'items' => $items];
    }

    private function snippet(?string $text, int $max = 180): string
    {
        if (! $text) return '';
        $clean = preg_replace('/\s+/', ' ', trim($text));
        return mb_strlen($clean) > $max ? mb_substr($clean, 0, $max).'…' : $clean;
    }

    private function news(string $like): array
    {
        return NewsPost::query()
            ->where('is_published', true)
            ->where(fn ($q) => $q->where('title', 'like', $like)->orWhere('body', 'like', $like))
            ->limit(self::PER_GROUP)
            ->get()
            ->map(fn ($p) => [
                'title' => $p->title,
                'snippet' => $this->snippet($p->body),
                'badge' => $p->category ?: null,
                'url' => '/#news-'.($p->slug ?: $p->id),
            ])
            ->all();
    }

    private function opportunities(string $like): array
    {
        return OpportunityListing::query()
            ->where('is_active', true)
            ->where(fn ($q) => $q->where('title', 'like', $like)
                ->orWhere('summary', 'like', $like)
                ->orWhere('location', 'like', $like))
            ->limit(self::PER_GROUP)
            ->get()
            ->map(fn ($l) => [
                'title' => $l->title,
                'snippet' => $this->snippet($l->summary ?? $l->location),
                'badge' => $l->ref ?: null,
                'url' => '/opportunities',
            ])
            ->all();
    }

    private function commitments(string $like): array
    {
        return Commitment::query()
            ->where('is_active', true)
            ->where(fn ($q) => $q->where('title', 'like', $like)->orWhere('body', 'like', $like))
            ->limit(self::PER_GROUP)
            ->get()
            ->map(fn ($c) => [
                'title' => $c->title,
                'snippet' => $this->snippet($c->body),
                'badge' => null,
                'url' => '/our-commitment#'.$c->slug,
            ])
            ->all();
    }

    private function strategic(string $like): array
    {
        $pages = StrategicPriorityPage::query()
            ->where(fn ($q) => $q->where('heading', 'like', $like)
                ->orWhere('body', 'like', $like)
                ->orWhere('between_body', 'like', $like))
            ->limit(self::PER_GROUP)
            ->get()
            ->map(fn ($p) => [
                'title' => $p->heading ?: $p->page_key,
                'snippet' => $this->snippet($p->body),
                'badge' => 'Page',
                'url' => '/strategic-priorities/'.$p->page_key,
            ]);

        $cards = StrategicPriorityCard::query()
            ->where(fn ($q) => $q->where('title', 'like', $like))
            ->limit(self::PER_GROUP)
            ->get()
            ->map(fn ($c) => [
                'title' => $c->title,
                'snippet' => '',
                'badge' => 'Card',
                'url' => '/strategic-priorities',
            ]);

        return $pages->merge($cards)->take(self::PER_GROUP)->values()->all();
    }

    private function donate(string $like): array
    {
        return DonationItem::query()
            ->where('is_active', true)
            ->where('kind', DonationItem::KIND_CAUSE)
            ->where(fn ($q) => $q->where('title', 'like', $like)->orWhere('body', 'like', $like))
            ->limit(self::PER_GROUP)
            ->get()
            ->map(fn ($d) => [
                'title' => $d->title,
                'snippet' => $this->snippet($d->body),
                'badge' => null,
                'url' => '/donate',
            ])
            ->all();
    }

    private function media(string $like): array
    {
        return MediaItem::query()
            ->where('is_active', true)
            ->where(fn ($q) => $q->where('title', 'like', $like)->orWhere('video_url', 'like', $like))
            ->limit(self::PER_GROUP)
            ->get()
            ->map(fn ($m) => [
                'title' => $m->title ?: '(no title)',
                'snippet' => $this->snippet($m->video_url),
                'badge' => ucfirst($m->kind),
                'url' => '/media',
            ])
            ->all();
    }

    private function resilience(string $like): array
    {
        $sectionLabel = [
            ResilienceItem::SECTION_CAPACITY => 'Capacity',
            ResilienceItem::SECTION_POLICY => 'Policy',
            ResilienceItem::SECTION_PROGRAMMATIC_APPROACH => 'Programmatic',
            ResilienceItem::SECTION_COLLECTIVE_RESILIENCE => 'Collective',
        ];

        return ResilienceItem::query()
            ->where('is_active', true)
            ->where(fn ($q) => $q->where('title', 'like', $like)
                ->orWhere('body', 'like', $like)
                ->orWhere('caption', 'like', $like))
            ->limit(self::PER_GROUP)
            ->get()
            ->map(fn ($r) => [
                'title' => $r->title ?: '(no title)',
                'snippet' => $this->snippet($r->body ?: $r->caption),
                'badge' => $sectionLabel[$r->section] ?? $r->section,
                'url' => '/vdo-resilience',
            ])
            ->all();
    }
}
