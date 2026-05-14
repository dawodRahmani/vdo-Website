<?php

namespace Database\Seeders;

use App\Models\StrategicPriorityBullet;
use App\Models\StrategicPriorityCard;
use App\Models\StrategicPriorityPage;
use Illuminate\Database\Seeder;

class StrategicPrioritiesSeeder extends Seeder
{
    public function run(): void
    {
        $cards = [
            ['Education', '/strategic-priorities/education', 'BookOpen', 'Quality, inclusive, and safe learning for girls, adolescents, out-of-school children, and youth.'],
            ['Economic Growth', '/strategic-priorities/economic-growth', 'TrendingUp', 'Livelihoods, TVET, entrepreneurship, and career placement for women and youth.'],
            ['Rural Development', '/strategic-priorities/rural-development', 'Building2', 'Climate-resilient communities, water security, and sustainable urban–rural development.'],
            ['Health and Nutrition', '/strategic-priorities/health-and-nutrition', 'HeartPulse', 'Primary healthcare, nutrition, and mobile services for women, children, and crisis-affected communities.'],
            ['Emergency Response', '/strategic-priorities/emergency-response', 'AlertTriangle', 'Rapid, dignified humanitarian assistance for households affected by crises and disasters.'],
            ["VDO's Cross Cutting Areas", '/strategic-priorities/cross-cutting-areas', 'Layers', 'Gender, safeguarding, inclusion, accountability, and protection mainstreamed across programs.'],
            ['Target Group', '/strategic-priorities/target-group', 'Target', 'Primary beneficiaries: women, girls, youth, out-of-school children, and crisis-affected families.'],
            ["VDO's Secondary Beneficiaries", '/strategic-priorities/secondary-beneficiaries', 'UsersRound', 'Community leaders, local CSOs, employers, and government bodies enabling program delivery.'],
            ['Tertiary Audience', '/strategic-priorities/tertiary-audience', 'Users', 'Donors, diaspora networks, media, and research institutions supporting advocacy and policy.'],
            ["VDO's Contribution Project", '/strategic-priorities/contribution-project', 'CheckCircle2', 'Frontline awareness, training, dignity kits, and integrated health-nutrition-immunization work.'],
        ];
        foreach ($cards as $i => [$title, $href, $icon, $desc]) {
            StrategicPriorityCard::updateOrCreate(
                ['href' => $href],
                ['title' => $title, 'icon_name' => $icon, 'description' => $desc, 'order' => $i]
            );
        }

        $pages = [
            'education' => [
                'label' => 'Education',
                'heading' => 'Education:',
                'body' => implode("\n\n", [
                    "VDO is a development organization in Afghanistan dedicated to improving quality education through a strong focus on access, equity, safety, and inclusion. By working in the country's most underserved communities, VDO strives to ensure that every child—regardless of gender, ability, or background—has the opportunity to learn in a safe and supportive environment.",
                    "VDO's education initiatives prioritize the most vulnerable and underserved populations, focusing on five key target groups:",
                ]),
                'infographic_path' => '/svg/education.svg',
                'infographic_alt' => 'Education coverage: target groups, coverage areas, and beneficiary breakdown',
                'between_body' => implode("\n\n", [
                    'By constructing schools, distributing learning materials, and supporting adolescent girls\' education, VDO contributes directly to **SDG 4** (Quality Education) and **SDG 5** (Gender Equality).',
                    'Our work ensures that education remains a right, not a privilege, even for those in the most remote and displacement-affected communities.',
                ]),
                'achievements_heading' => 'Key Achievements:',
                'beneficiary_path' => '/svg/Strategic Priorities/03.svg',
                'beneficiary_alt' => 'Education beneficiaries: Female 166,920 (48%), Male 153,080 (52%), Total 321,000',
                'bullets' => [
                    'Implementing Community Based Education (CBE), Accelerate Learning Programs (ALP), Teacher training in multiple provinces using VDO-developed GBV-safe schooling guides.',
                    'Improved school safety awareness and retention of girls in education.',
                    "Field-tested community engagement models increasing access and acceptance for girls' learning.",
                    'Demonstrated successful transition of community schools to formal education systems.',
                ],
            ],
            'economic-growth' => [
                'label' => 'Economic Growth',
                'heading' => 'Economic Growth:',
                'body' => 'VDO has advanced economic growth by equipping individuals—especially women and youth—with startup kits, small business grants, and financial literacy skills, enabling them to build sustainable livelihoods. The organization provides TVET and market-aligned skills training, coupled with entrepreneurship support, mentorship, and coaching to help participants successfully launch or expand their businesses. Through start-up toolkits and seed grants, VDO has strengthened numerous women-led enterprises and promoted financial independence. Its WAQAR Career Center initiative offers career guidance and job placement services, linking jobseekers to meaningful employment.',
                'infographic_path' => '/svg/Strategic Priorities/04.svg',
                'infographic_alt' => 'Economic Growth coverage: Kabul, Northern Regions, Western Regions, Eastern Regions',
                'between_body' => 'As a frontline defender of humanitarian principles, VDO engages in policy dialogues on resilience and inclusive growth. Linking grassroots practices with national frameworks, we contribute to **SDG 1** (No Poverty) and **SDG 8** (Decent Work & Economic Growth). Our integrated approach helps displaced and marginalized households secure food, income, and dignity.',
                'achievements_heading' => 'Key Achievements:',
                'beneficiary_path' => '/svg/Strategic Priorities/05.svg',
                'beneficiary_alt' => 'Economic Growth beneficiaries: Women 36,450 (45%), Men 32,400 (40%), Children/Youth 12,150 (15%), Total 81,000',
                'bullets' => [
                    'Supporting women-owned businesses and inclusive entrepreneurship initiatives.',
                    'Promoting sustainable livelihoods and income generation for youth, women, returnees, refugees, and IDPs.',
                    'Strengthening job placement, employability, and private sector engagement opportunities.',
                    'Expanding disability-inclusive and home-based livelihood support initiatives.',
                    'Building climate-resilient and market-driven economic empowerment programs.',
                    'Enhancing economic resilience through skills development, enterprise support, and workforce readiness initiatives.',
                ],
            ],
            'rural-development' => [
                'label' => 'Rural Development',
                'heading' => 'Rural Development:',
                'body' => "VDO's Rural Development work promotes sustainable, climate-resilient, and inclusive cities by integrating environmental protection, community-driven planning, and risk-reduction measures across all programs. With a commitment to strengthening the resilience of Afghanistan's most vulnerable populations—including rural farming families affected by droughts and floods, women and girls facing livelihood and water insecurity, internally displaced people (IDPs), and disaster-affected communities, people with disabilities and vulnerable households, youth engaged in local climate action, community resilience and water management groups.",
                'infographic_path' => '/svg/Strategic Priorities/06.svg',
                'infographic_alt' => 'Rural Development coverage: Northern drought-prone, Eastern flood-affected, Western drought-prone, Central flood-affected provinces',
                'between_body' => 'These efforts aim to safeguard lives, livelihoods, water security, and food systems, while promoting healthier ecosystems and long-term sustainability.' . "\n\n" . "As a national advocate for climate resilience, VDO bridges local adaptation practices with global sustainability frameworks, contributing directly to **SDG 11** (Sustainable Cities and Communities), **SDG 13** (Climate Action), and **SDG 15** (Life on Land). By embedding climate considerations into all rural programming, VDO helps secure a healthier, greener, and more resilient future for Afghanistan's next generations.",
                'achievements_heading' => 'Our interventions include:',
                'beneficiary_path' => '/svg/Strategic Priorities/07.svg',
                'beneficiary_alt' => 'Rural Development beneficiaries: Farmers 19,520 (40%), Women 17,080 (35%), IDPs 7,320 (15%), People with Disabilities 4,880 (10%), Total 48,800',
                'bullets' => [
                    'Rural reforestation and greenbelt development to reduce heat islands, prevent erosion, and restore ecological balance.',
                    'Promotion of clean and renewable energy sources, including household and community-level solar solutions.',
                    'Climate-smart agriculture models, tailored for peri-rural households and small-scale farmers, to improve food security and reduce pressure on degraded land.',
                    'Community-led environmental stewardship, including awareness campaigns on waste reduction, recycling, water conservation, and disaster preparedness.',
                    'Rural water management through improved drainage, flood prevention measures, and protection of natural water sources.',
                ],
            ],
            'health-and-nutrition' => [
                'label' => 'Health and Nutrition',
                'heading' => 'Health and Nutrition:',
                'body' => 'VDO advances equitable access to essential and life-saving primary healthcare and nutrition services for women, children, and crisis-affected communities, ensuring dignity, safety, and stronger foundations for long-term well-being, through community health centers, and mobile health and nutrition team and emergency responses approach.',
                'infographic_path' => '/svg/Health and Nutrition - Map.svg',
                'infographic_alt' => 'Health and Nutrition coverage: Central, Northeastern, West, Eastern regions',
                'between_body' => "VDO as an active member of the Health and WASH Clusters, ensures alignment with global humanitarian standards. Our focus on training health workers and deploying mobile services reflects Afghanistan's urgent need for equitable healthcare access, advancing **SDG 3** (Good Health & Wellbeing) and reducing inequalities for the most at-risk.",
                'achievements_heading' => 'Key Achievements:',
                'beneficiary_path' => '/svg/Health and Nutrition - Number of Beneficiaries.svg',
                'beneficiary_alt' => 'Health and Nutrition beneficiaries: Children 288,154 (30%), Women 480,257 (50%), Others 192,103 (20%), Total 960,515 (100%)',
                'bullets' => [
                    'Awareness raising of women, girls, and families on COVID-19, nutrition, and menstrual hygiene management in North.',
                    'Training of frontline workers (CHW, Nutrition counsellors, mobile teams) on PSS.',
                    'Conduct 30 awareness-raising sessions on available nutrition services and provide training to nutrition partners on conducting safety audits.',
                    'Distribute dignity kits to vulnerable women and girls and establish women- and girls-friendly spaces near health centres for recreational activities and GBV awareness.',
                    'Through the Integrated Health–Nutrition–Immunization Project VDO addressed vaccine misconceptions and promoted positive health behaviors, leading caregivers to better understand and accept immunization and nutrition services, improving child health outcomes in East.',
                ],
            ],
            'emergency-response' => [
                'label' => 'Emergency Response',
                'heading' => 'Emergency Response:',
                'body' => "VDO delivers rapid, community-centered emergency assistance to households affected by crises, natural disasters, and conflict across Afghanistan. Our approach focuses on meeting urgent needs while protecting the dignity and resilience of affected families. Through coordinated humanitarian interventions—including emergency cash assistance, distribution of essential non-food items, nutrition support, and access to lifesaving information and referrals—we ensure that vulnerable women, children, and marginalized groups receive timely and equitable support. Guided by local knowledge and rooted in strong community networks, VDO's emergency response programs are designed to save lives, reduce suffering, and help communities recover with strength and hope.",
                'infographic_path' => null,
                'infographic_alt' => null,
                'between_body' => null,
                'achievements_heading' => null,
                'beneficiary_path' => null,
                'beneficiary_alt' => null,
                'bullets' => [],
            ],
            'cross-cutting-areas' => [
                'label' => "VDO's Cross Cutting Areas",
                'heading' => "VDO's Cross Cutting Areas:",
                'body' => null,
                'infographic_path' => '/svg/Strategic Priorities/11.svg',
                'infographic_alt' => "VDO's 12 cross-cutting areas: Gender equality and women's empowerment, Safeguarding/PSEAH/Child protection, Accountability to affected people, Do no harm and conflict sensitivity, Protection mainstreaming, Inclusion of persons with disabilities, Environmental sustainability and climate sensitivity, Localization and community ownership, Data protection and ethical information management, Anti-fraud/anti-corruption/aid diversion protection, MEAL and evidence-based programming, Equity, diversity and inclusion",
                'between_body' => null,
                'achievements_heading' => null,
                'beneficiary_path' => null,
                'beneficiary_alt' => null,
                'bullets' => [],
            ],
            'target-group' => [
                'label' => 'Target Group',
                'heading' => 'Target Groups:',
                'body' => "VDO's beneficiaries include vulnerable and underserved groups across Afghanistan who directly and indirectly receive support through its programs:",
                'infographic_path' => '/svg/Strategic Priorities/12.svg',
                'infographic_alt' => "VDO's primary beneficiaries",
                'between_body' => null,
                'achievements_heading' => "VDO's Primary Beneficiaries",
                'beneficiary_path' => null,
                'beneficiary_alt' => null,
                'bullets' => [],
            ],
            'secondary-beneficiaries' => [
                'label' => "VDO's Secondary Beneficiaries",
                'heading' => "VDO's Secondary Beneficiaries:",
                'body' => null,
                'infographic_path' => null,
                'infographic_alt' => null,
                'between_body' => null,
                'achievements_heading' => null,
                'beneficiary_path' => null,
                'beneficiary_alt' => null,
                'bullets' => [
                    'Community Leaders & Influencers: Elders and religious figures supporting safe participation and positive social norms.',
                    'Local Civil Society Organizations: Women- and youth-led groups benefiting from capacity-building, collaboration, advocacy (e.g., Change Drive Network).',
                    'Private Sector & Employers: Access to skilled jobseekers, apprenticeships, internships, inclusive employment.',
                    'Government Bodies & Local Authorities: Facilitating policy alignment, approvals, and safe community access.',
                ],
            ],
            'tertiary-audience' => [
                'label' => 'Tertiary Audience',
                'heading' => 'Tertiary Audience (Influencers & Advocates):',
                'body' => 'The tertiary audience contributes through funding, advocacy, and technical collaboration, while Afghan diaspora leaders and regional/global networks amplify the voices of women and youth, and researchers, academics, and storytelling partners support evidence-based policy and highlight local success stories.',
                'infographic_path' => '/svg/Strategic Priorities/13.svg',
                'infographic_alt' => 'Tertiary audience tiers: International NGOs, UN Agencies & Donors; Diaspora & Global Network; Media & Research Institutions',
                'between_body' => null,
                'achievements_heading' => null,
                'beneficiary_path' => null,
                'beneficiary_alt' => null,
                'bullets' => [],
            ],
            'contribution-project' => [
                'label' => "VDO's Contribution Project",
                'heading' => 'VDO Contribution Project:',
                'body' => null,
                'infographic_path' => null,
                'infographic_alt' => null,
                'between_body' => null,
                'achievements_heading' => null,
                'beneficiary_path' => null,
                'beneficiary_alt' => null,
                'bullets' => [
                    'Awareness raising of women, girls, and families on COVID-19, nutrition, and menstrual hygiene management in the North.',
                    'Training of frontline workers (CHW, Nutrition counsellors, mobile teams) on PSS.',
                    'Conduct 30 awareness-raising sessions on available nutrition services and provide training to nutrition partners on conducting safety audits.',
                    'Distribute dignity kits to vulnerable women and girls and establish women- and girls-friendly spaces near health centres for recreational activities and GBV awareness.',
                    'Through the Integrated Health–Nutrition–Immunization Project, VDO addressed vaccine misconceptions and promoted positive health behaviors, leading caregivers to better understand and accept immunization and nutrition services, improving child health outcomes in the East.',
                ],
            ],
        ];

        $order = 0;
        foreach ($pages as $key => $data) {
            $bullets = $data['bullets'];
            unset($data['bullets']);
            $data['order'] = $order++;
            $data['page_label'] = $data['label'];
            unset($data['label']);

            StrategicPriorityPage::updateOrCreate(['page_key' => $key], $data);

            StrategicPriorityBullet::where('page_key', $key)->delete();
            foreach ($bullets as $i => $b) {
                StrategicPriorityBullet::create([
                    'page_key' => $key,
                    'content' => $b,
                    'order' => $i,
                ]);
            }
        }
    }
}
