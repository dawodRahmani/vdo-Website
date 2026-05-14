<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\DonationItem;
use App\Models\HomeCommitment;
use App\Models\HomeImpactStat;
use App\Models\HomePriorityArea;
use App\Models\LeadershipRole;
use App\Models\MediaItem;
use App\Models\NewsPost;
use App\Models\ResilienceItem;
use Illuminate\Http\Request;

class AdminSearchController extends Controller
{
    private const PER_GROUP = 6;

    public function search(Request $request)
    {
        $q = trim((string) $request->query('q', ''));
        if (mb_strlen($q) < 2) {
            return response()->json(['groups' => []]);
        }

        $like = '%'.str_replace(['\\', '%', '_'], ['\\\\', '\\%', '\\_'], $q).'%';

        $groups = [];

        $this->addGroup($groups, 'Donate', $this->searchDonate($like));
        $this->addGroup($groups, 'Media', $this->searchMedia($like));
        $this->addGroup($groups, "VDO's Resilience", $this->searchResilience($like));
        $this->addGroup($groups, 'News & Announcements', $this->searchNews($like));
        $this->addGroup($groups, 'Leadership (About Page)', $this->searchLeadership($like));
        $this->addGroup($groups, 'Home Page', $this->searchHome($like));

        return response()->json([
            'groups' => $groups,
            'totalCount' => array_sum(array_map(fn ($g) => count($g['items']), $groups)),
        ]);
    }

    private function addGroup(array &$groups, string $label, array $items): void
    {
        if (empty($items)) return;
        $groups[] = ['label' => $label, 'items' => $items];
    }

    private function snippet(?string $text, int $max = 140): string
    {
        if (! $text) return '';
        $clean = preg_replace('/\s+/', ' ', trim($text));
        return mb_strlen($clean) > $max
            ? mb_substr($clean, 0, $max).'…'
            : $clean;
    }

    private function searchDonate(string $like): array
    {
        return DonationItem::query()
            ->where(fn ($q) => $q->where('title', 'like', $like)->orWhere('body', 'like', $like))
            ->limit(self::PER_GROUP)
            ->get()
            ->map(fn ($item) => [
                'title' => $item->title,
                'snippet' => $this->snippet($item->body),
                'badge' => ucfirst($item->kind),
                'url' => '/admin/donate',
            ])
            ->all();
    }

    private function searchMedia(string $like): array
    {
        return MediaItem::query()
            ->where(fn ($q) => $q->where('title', 'like', $like)->orWhere('video_url', 'like', $like))
            ->limit(self::PER_GROUP)
            ->get()
            ->map(fn ($item) => [
                'title' => $item->title ?: '(no title)',
                'snippet' => $this->snippet($item->video_url ?: ''),
                'badge' => ucfirst($item->kind),
                'url' => '/admin/media',
            ])
            ->all();
    }

    private function searchResilience(string $like): array
    {
        $sectionToUrl = [
            ResilienceItem::SECTION_CAPACITY => '/admin/resilience/capacities',
            ResilienceItem::SECTION_POLICY => '/admin/resilience/policies',
            ResilienceItem::SECTION_PROGRAMMATIC_APPROACH => '/admin/resilience/programmatic-approach',
            ResilienceItem::SECTION_COLLECTIVE_RESILIENCE => '/admin/resilience/collective-resilience',
        ];
        $sectionLabel = [
            ResilienceItem::SECTION_CAPACITY => 'Capacity',
            ResilienceItem::SECTION_POLICY => 'Policy',
            ResilienceItem::SECTION_PROGRAMMATIC_APPROACH => 'Programmatic',
            ResilienceItem::SECTION_COLLECTIVE_RESILIENCE => 'Collective',
        ];

        return ResilienceItem::query()
            ->where(fn ($q) => $q->where('title', 'like', $like)
                ->orWhere('body', 'like', $like)
                ->orWhere('caption', 'like', $like))
            ->limit(self::PER_GROUP)
            ->get()
            ->map(fn ($item) => [
                'title' => $item->title ?: '(no title)',
                'snippet' => $this->snippet($item->body ?: $item->caption),
                'badge' => $sectionLabel[$item->section] ?? $item->section,
                'url' => $sectionToUrl[$item->section] ?? '/admin',
            ])
            ->all();
    }

    private function searchNews(string $like): array
    {
        return NewsPost::query()
            ->where(fn ($q) => $q->where('title', 'like', $like)->orWhere('body', 'like', $like))
            ->limit(self::PER_GROUP)
            ->get()
            ->map(fn ($post) => [
                'title' => $post->title,
                'snippet' => $this->snippet($post->body),
                'badge' => $post->category ?: null,
                'url' => '/admin/news',
            ])
            ->all();
    }

    private function searchLeadership(string $like): array
    {
        return LeadershipRole::query()
            ->where(fn ($q) => $q->where('title', 'like', $like)->orWhere('body', 'like', $like))
            ->limit(self::PER_GROUP)
            ->get()
            ->map(fn ($role) => [
                'title' => $role->title,
                'snippet' => $this->snippet($role->body),
                'badge' => null,
                'url' => '/admin/diagrams/leadership-roles',
            ])
            ->all();
    }

    private function searchHome(string $like): array
    {
        $items = collect();

        $items = $items->merge(
            HomePriorityArea::query()
                ->where(fn ($q) => $q->where('title', 'like', $like)->orWhere('body', 'like', $like))
                ->limit(self::PER_GROUP)
                ->get()
                ->map(fn ($i) => [
                    'title' => $i->title,
                    'snippet' => $this->snippet($i->body),
                    'badge' => 'Priority Area',
                    'url' => '/admin/home-page',
                ]),
        );

        $items = $items->merge(
            HomeCommitment::query()
                ->where(fn ($q) => $q->where('title', 'like', $like)->orWhere('body', 'like', $like))
                ->limit(self::PER_GROUP)
                ->get()
                ->map(fn ($i) => [
                    'title' => $i->title,
                    'snippet' => $this->snippet($i->body),
                    'badge' => 'Commitment',
                    'url' => '/admin/home-page',
                ]),
        );

        $items = $items->merge(
            HomeImpactStat::query()
                ->where('label', 'like', $like)
                ->limit(self::PER_GROUP)
                ->get()
                ->map(fn ($i) => [
                    'title' => $i->label,
                    'snippet' => '',
                    'badge' => 'Impact Stat',
                    'url' => '/admin/home-page',
                ]),
        );

        return $items->take(self::PER_GROUP)->values()->all();
    }
}
