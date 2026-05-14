<?php

namespace Database\Seeders;

use App\Models\AboutPage;
use Illuminate\Database\Seeder;

class AboutPageSeeder extends Seeder
{
    public function run(): void
    {
        $executiveBody = implode("\n\n", [
            "Vision Development Organization (VDO) is a women-led national non-governmental organization established in 2015 with a clear mission: to empower women, youth, and marginalized communities to lead change and build resilient futures in Afghanistan. Rooted in communities and guided by humanitarian principles, VDO has grown into a trusted and credible organization delivering high-quality humanitarian, development, and advocacy programming across multiple regions of the country.",
            "Operating in one of the world's most complex and constrained environments, VDO has demonstrated exceptional resilience, adaptability, and compliance. Since 2021, the organization has sustained uninterrupted operations by combining strong local acceptance, principled engagement, and robust risk-mitigation systems. VDO's ability to navigate access constraints, policy shifts, and protection risks—while safeguarding staff, communities, and resources—has positioned it as a reliable partner for donors, UN agencies, and coordination platforms.",
            "VDO's programming addresses interconnected needs through integrated and multisectoral approaches. Our work spans education and alternative learning pathways, livelihoods and economic resilience, gender equality and protection, health and nutrition, WASH, climate and environmental resilience, emergency response, and evidence-based advocacy. Across all sectors, VDO prioritizes accountability to affected populations, safeguarding and zero tolerance for exploitation, abuse, fraud, and aid diversion, and the meaningful inclusion of women, girls, persons with disabilities, returnees, and other at-risk groups.",
            "Strong governance, compliance, and institutional systems underpin VDO's impact. The organization maintains comprehensive policies covering safeguarding, PSEAH, compliance, anti-corruption, risk management, financial control, procurement, data protection, and security. These systems are actively implemented, monitored, and continuously strengthened to meet international donor standards while remaining responsive to the Afghan context.",
            'As a nationally anchored organization, VDO also plays an active leadership role in coordination, dialogue, and sector representation at national and sub-national levels. Through these platforms, VDO contributes Afghan-led perspectives, promotes localization, and advocates for more effective, inclusive, and accountable aid delivery.',
            'Looking ahead, VDO is committed to deepening its impact, strengthening Afghan civil society, and expanding its role as a center of excellence for safe, principled, and evidence-driven programming. Guided by its senior management and supported by dedicated teams, VDO remains focused on delivering results with integrity—today and for the future of Afghanistan.',
        ]);

        $historyBody = implode("\n\n", [
            "Vision Development Organization (VDO) Founded in 2015 by a courageous Afghan woman. VDO is dedicated to education, advocacy, and empowerment for Afghanistan's most vulnerable communities. Initially focused on community-based advocacy, capacity-building workshops, and awareness campaigns, VDO operated through volunteerism, building trust and credibility at the grassroots level.",
            "Following the government collapse in 2021, In response to Afghanistan's escalating social and economic instability VDO expanded its impact. In June 2022, the organization signed its first official grant, delivering lifesaving services in Inclusion, Protection, and Health to marginalized populations, including women, children, and persons with disabilities.",
            'Since then, VDO has launched multiple initiatives in health, livelihoods, food security, humanitarian aid, and programs bridging emergency response with long-term development. Today, VDO is a recognized Afghan NGO capable of operating in complex environments, navigating access challenges, and delivering results under difficult circumstances. Beyond service delivery, VDO amplifies Afghan voices at national and international forums, including the UN Human Rights Council, the Afghanistan Coordination Group, and the Senior Officials Meeting in Brussels, providing evidence-based recommendations to shape humanitarian and development policy.',
        ]);

        $lookingAheadBody = implode("\n\n", [
            'Afghanistan faces a fragile humanitarian landscape, widespread poverty, and restrictions on the rights of women and girls. Limited international aid and a weakened financial system have strained services and community resilience, while rising food insecurity, shrinking economic opportunities, and youth psychosocial stress pose ongoing challenges.',
            'Amid these difficulties, opportunities exist for innovative, community-driven solutions in areas like climate adaptation, food security, livelihoods, and youth empowerment — where humanitarian and development goals can align.',
            'As a woman-led national NGO with deep local networks, VDO is uniquely positioned to navigate these challenges. Our strategy focuses on long-term community resilience, skills development, and safe spaces for dialogue, empowering Afghan women and youth to actively shape their futures. Over the next five years, VDO will leverage its expertise and partnerships to protect lives, uphold dignity, and advance equity and sustainable development in Afghanistan.',
        ]);

        AboutPage::updateOrCreate(
            ['id' => 1],
            [
                'executive_heading' => 'Executive Summary:',
                'executive_subheading' => 'Message from the Senior Management Team',
                'executive_body' => $executiveBody,
                'history_heading' => 'History:',
                'history_body' => $historyBody,
                'coordination_intro' => "VDO's credibility is further strengthened by its active membership and leadership roles in major coordination bodies:",
                'coordination_outro' => 'These roles allow VDO to shape policies, influence programming priorities, and advocate for principled, needs-driven humanitarian response in Afghanistan.',
                'mission_lead' => 'Our mission',
                'mission_body' => 'is to deliver impactful humanitarian assistance and drive sustainable development by empowering vulnerable communities in Afghanistan. We work for all Afghanistan with a particular focus on women, children, to ensure everyone reach their full potential and contribute to the development of their communities. We achieve this by addressing the education, healthcare, social, and economic, needs of our target groups, while promoting resilience, equality, and human rights.',
                'vision_lead' => 'Our vision',
                'vision_body' => 'is a prosperous and inclusive Afghanistan where every community has the opportunity to thrive in dignity, peace, and sustainability.',
                'looking_ahead_heading' => 'Looking Ahead',
                'looking_ahead_subheading' => 'Looking Ahead: Crisis and Possibility',
                'looking_ahead_body' => $lookingAheadBody,
            ]
        );
    }
}
