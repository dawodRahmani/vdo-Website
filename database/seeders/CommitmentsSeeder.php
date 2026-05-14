<?php

namespace Database\Seeders;

use App\Models\Commitment;
use App\Models\CommitmentPublication;
use Illuminate\Database\Seeder;

class CommitmentsSeeder extends Seeder
{
    public function run(): void
    {
        $items = [
            [
                'slug' => 'gender-equality',
                'title' => "Gender Equality & Women's Empowerment",
                'body' => "VDO promotes equal opportunities, leadership, participation, and access to services for women and girls across all programs and operations.\n\nWe prioritize women-led approaches that strengthen dignity, resilience, economic participation, and decision-making power within communities.",
            ],
            [
                'slug' => 'safeguarding-pseah',
                'title' => 'Safeguarding, PSEAH & Child Protection',
                'body' => "VDO maintains a zero-tolerance approach toward sexual exploitation, abuse, harassment, and all forms of violence against children and vulnerable individuals.\n\nSafeguarding principles are integrated across all activities to ensure safe, respectful, and accountable humanitarian and development programming.",
            ],
            [
                'slug' => 'aap',
                'title' => 'Accountability to Affected People (AAP)',
                'body' => "VDO ensures that communities are informed, consulted, and actively engaged throughout the project cycle.\n\nFeedback and complaint mechanisms are established to strengthen transparency, participation, and community trust.",
            ],
            [
                'slug' => 'do-no-harm',
                'title' => 'Do No Harm & Conflict Sensitivity',
                'body' => "VDO designs and implements programs in ways that minimize risks, avoid unintended harm, and strengthen social cohesion.\n\nWe apply conflict-sensitive approaches that respect local dynamics, cultural contexts, and community relationships.",
            ],
            [
                'slug' => 'protection-mainstreaming',
                'title' => 'Protection Mainstreaming',
                'body' => "Protection considerations are integrated across all sectors to ensure safe, dignified, and equitable access to assistance and services.\n\nSpecial attention is given to vulnerable groups facing heightened risks, exclusion, or protection concerns.",
            ],
            [
                'slug' => 'inclusion-pwd',
                'title' => 'Inclusion of Persons with Disabilities',
                'body' => "VDO promotes disability-inclusive programming by reducing barriers to participation, access, and representation.\n\nWe work to ensure that persons with disabilities can safely and meaningfully engage in all interventions and community processes.",
            ],
            [
                'slug' => 'environmental-sustainability',
                'title' => 'Environmental Sustainability & Climate Sensitivity',
                'body' => "VDO integrates environmentally responsible and climate-resilient approaches across humanitarian and development programming.\n\nWe promote sustainable resource management, climate adaptation, and community resilience to environmental shocks.",
            ],
            [
                'slug' => 'localization',
                'title' => 'Localization & Community Ownership',
                'body' => "VDO believes that sustainable change is achieved through locally led and community-driven approaches.\n\nWe strengthen local capacities, partnerships, and participation to ensure long-term ownership and impact.",
            ],
            [
                'slug' => 'data-protection',
                'title' => 'Data Protection & Ethical Information Management',
                'body' => "VDO is committed to the safe, confidential, and ethical management of personal and organizational data.\n\nData collection, storage, sharing, and reporting processes follow protection, privacy, and accountability principles.",
            ],
            [
                'slug' => 'anti-fraud',
                'title' => 'Anti-Fraud, Anti-Corruption & Aid Diversion Protection',
                'body' => "VDO applies strong compliance, financial control, and risk management systems to prevent fraud, corruption, and aid diversion.\n\nTransparency, accountability, and ethical conduct are enforced across all organizational operations and partnerships.",
            ],
            [
                'slug' => 'meal',
                'title' => 'MEAL & Evidence-Based Programming',
                'body' => "VDO promotes Monitoring, Evaluation, Accountability, and Learning (MEAL) systems to improve program quality and effectiveness.\n\nEvidence, community feedback, and lessons learned are used to guide adaptive and impact-driven programming.",
            ],
            [
                'slug' => 'edi',
                'title' => 'Equity, Diversity & Inclusion (EDI)',
                'body' => "VDO values diversity and promotes equitable participation regardless of gender, age, disability, ethnicity, or background.\n\nWe foster inclusive environments that respect dignity, representation, and equal opportunity for all.",
            ],
        ];

        foreach ($items as $i => $row) {
            Commitment::updateOrCreate(
                ['slug' => $row['slug']],
                [
                    'slug' => $row['slug'],
                    'title' => $row['title'],
                    'body' => $row['body'],
                    'card_svg_path' => '/svg/Our Commitment/C'.($i + 1).'.svg',
                    'order' => $i + 1,
                    'is_active' => true,
                ]
            );
        }

        $publications = [
            ['title' => 'Project Final Report', 'cover_path' => '/Header and Gallary Photos/P1.jpg'],
            ['title' => 'Guide Book', 'cover_path' => '/Header and Gallary Photos/P2.jpg'],
            ['title' => 'Project Conclusion Report', 'cover_path' => '/Header and Gallary Photos/P3.jpg'],
            ['title' => 'Annual Booklet 2023', 'cover_path' => '/Header and Gallary Photos/P4.jpg'],
        ];

        foreach ($publications as $i => $p) {
            CommitmentPublication::updateOrCreate(
                ['title' => $p['title']],
                [
                    'title' => $p['title'],
                    'cover_path' => $p['cover_path'],
                    'order' => $i + 1,
                    'is_active' => true,
                ]
            );
        }
    }
}
