<?php

namespace Database\Seeders;

use App\Models\ResilienceItem;
use Illuminate\Database\Seeder;

class ResilienceItemSeeder extends Seeder
{
    public function run(): void
    {
        $base = '/svg/VDO_s Resilience';

        // Capacity slides
        $slides = ['01', '02', '03', '04'];
        foreach ($slides as $i => $num) {
            ResilienceItem::updateOrCreate(
                [
                    'section' => ResilienceItem::SECTION_CAPACITY,
                    'image' => "{$base}/{$num}.svg",
                ],
                [
                    'section' => ResilienceItem::SECTION_CAPACITY,
                    'title' => "Capacity Booklet {$num}",
                    'image' => "{$base}/{$num}.svg",
                    'order' => $i + 1,
                    'is_active' => true,
                ],
            );
        }

        // Policies — icons are 06.svg through 35.svg
        $policies = [
            ['Program Policy', "VDO's Program Policy provides a comprehensive framework for planning, implementing, monitoring, and closing programs across all sectors. It ensures quality, relevance, accountability, and measurable impact throughout the project cycle. The policy aligns programs with community needs, donor requirements, and national regulations. Cross-cutting priorities such as gender equality, safeguarding, and risk management are embedded. This policy ensures consistent and effective program delivery."],
            ['Feedback Response Mechanism (FRM)', 'The FRM Policy ensures that communities can safely share feedback, concerns, and complaints. It promotes transparency, trust, and open communication with affected populations. Multiple accessible and confidential reporting channels are established. Feedback is reviewed in a timely and impartial manner. Lessons learned are used to improve program quality and accountability.'],
            ['Accountability to Affected Populations (AAP)', "VDO's AAP Policy commits the organization to inclusive, transparent, and participatory programming. It ensures communities are informed about project objectives, selection criteria, and entitlements. Affected populations are meaningfully engaged in decision-making processes. Feedback and complaints are actively addressed. This policy strengthens dignity, ownership, and program effectiveness."],
            ['Advocacy Policy', "The Advocacy Policy guides VDO's ethical, safe, and evidence-based advocacy work. It ensures advocacy is conflict-sensitive and aligned with humanitarian principles. The policy prioritizes the voices of women, youth, and marginalized groups. Risk mitigation measures protect staff and partners. Advocacy efforts are grounded in credible data and community realities."],
            ['Fundraising Policy', "VDO's Fundraising Policy ensures ethical and transparent resource mobilization. It aligns fundraising initiatives with the organization's mission and strategic priorities. The policy prevents conflicts of interest and reputational risks. Donor funds are managed with accountability and integrity. All fundraising complies with legal and donor requirements."],
            ['Data Privacy and Sharing Policy', 'This policy protects personal, sensitive, and organizational data collected by VDO. It defines clear standards for data collection, storage, access, and sharing. Informed consent and confidentiality are strictly maintained. Special protection is applied to vulnerable groups. Data practices comply with donor and international data protection standards.'],
            ['Risk Management Policy', "VDO's Risk Management Policy provides a systematic approach to identifying and mitigating risks. It covers operational, financial, safeguarding, security, and contextual risks. Risk analysis is integrated into planning and decision-making. Mitigation measures are regularly reviewed and updated. This policy enhances organizational resilience and accountability."],
            ['Partnership Policy', "The Partnership Policy governs VDO's collaboration with implementing and strategic partners. It ensures partnerships are transparent, accountable, and value-based. Due diligence and compliance checks are mandatory. Safeguarding and zero-tolerance standards apply to all partners. The policy promotes shared responsibility and sustainable impact."],
            ['MEAL Policy', "VDO's MEAL Policy ensures systematic monitoring, evaluation, accountability, and learning. It promotes evidence-based decision-making and adaptive management. Data quality and community feedback are prioritized. Findings inform program improvements and strategic planning. This policy strengthens impact and organizational learning."],
            ['Safeguarding Policy', 'The Safeguarding Policy commits VDO to preventing and responding to harm. It protects children, adults at risk, and all community members. Clear prevention, reporting, and response mechanisms are established. Safeguarding responsibilities apply to all staff and partners. The policy ensures safe and dignified programming.'],
            ['Protection from Sexual Exploitation and Abuse (PSEA) Policy', "VDO's PSEA Policy enforces zero tolerance for sexual exploitation and abuse. It applies to staff, partners, volunteers, and representatives. Safe and confidential reporting channels are provided. Survivor-centered response mechanisms are prioritized. The policy reinforces accountability and respect for dignity."],
            ['Whistleblowing Policy', 'The Whistleblowing Policy enables safe reporting of misconduct and violations. It guarantees confidentiality and protection from retaliation. Multiple secure reporting channels are available. Reports are handled impartially and promptly. This policy strengthens transparency and ethical conduct.'],
            ['Communication Policy', "VDO's Communication Policy ensures accurate, ethical, and coordinated communication. It governs branding, messaging, media engagement, and visibility. The policy protects sensitive information and community dignity. Approval and documentation processes are clearly defined. All communication reflects VDO's values and credibility."],
            ['Child Protection Policy', 'The Child Protection Policy safeguards children engaged in or affected by VDO programs. It establishes strict standards for prevention and response. Child-safe recruitment and programming practices are mandatory. Reporting mechanisms are accessible and confidential. The policy upholds the best interests of the child.'],
            ['Gender and Harassment Policy', "This policy promotes gender equality and a respectful working environment. It prohibits discrimination, harassment, and abuse. Clear reporting and response mechanisms are established. Women's leadership and inclusion are actively supported. The policy ensures dignity and fairness for all."],
            ['Compliance Policy', "VDO's Compliance Policy ensures adherence to laws, donor rules, and internal policies. It defines compliance roles and responsibilities across the organization. Monitoring and reporting mechanisms are established. Non-compliance is addressed through corrective actions. The policy strengthens accountability and donor confidence."],
            ['Governing Policy', "The Governing Policy defines the roles and responsibilities of VDO's Board. It ensures strategic oversight, ethical leadership, and accountability. Board independence and transparency are emphasized. The policy supports effective decision-making. It strengthens institutional governance and sustainability."],
            ['Operations Policy', 'The Operations Policy guides efficient and compliant organizational operations. It integrates administrative, logistical, and support functions. Consistency is ensured across HQ and field offices. The policy supports smooth program implementation. Operational risks are systematically managed.'],
            ['Finance Policy', "VDO's Finance Policy governs budgeting, accounting, and financial reporting. It ensures transparency, internal controls, and donor compliance. Clear segregation of duties is maintained. Financial risks are actively managed. The policy safeguards financial integrity and sustainability."],
            ['Audit Policy', 'The Audit Policy establishes internal and external audit mechanisms. It promotes accountability and continuous improvement. Audit findings are documented and addressed. Corrective actions are monitored and tracked. The policy enhances transparency and donor trust.'],
            ['Human Resources (HR) Policy', 'The HR Policy governs recruitment, performance management, and staff welfare. It promotes fairness, professionalism, and capacity development. Safeguarding and gender equality are integrated. Clear codes of conduct and grievance mechanisms are defined. The policy supports a motivated workforce.'],
            ['Procurement Policy', "VDO's Procurement Policy ensures transparent and competitive purchasing processes. It defines procurement methods, thresholds, and approvals. Value for money and fairness are prioritized. Conflict of interest and fraud risks are controlled. The policy aligns with donor standards."],
            ['IT Policy', 'The IT Policy governs the secure use of information systems and technology. It protects data confidentiality, integrity, and availability. User access and responsibilities are clearly defined. Cybersecurity risks are managed proactively. The policy supports efficient digital operations.'],
            ['Safety and Security Policy', 'This policy ensures the safety and security of staff and assets. It outlines risk assessment and incident management procedures. Context-specific security measures are applied. Staff responsibilities are clearly defined. The policy enables safe program delivery.'],
            ['Anti-Fraud Policy', "VDO's Anti-Fraud Policy enforces zero tolerance for fraud and corruption. It defines prevention, detection, and response measures. All staff and partners are accountable. Reporting mechanisms are confidential and accessible. The policy protects organizational integrity."],
            ['Code of Conduct', 'The Code of Conduct sets standards for ethical behavior and professionalism. It applies to staff, partners, and representatives. Respect, integrity, and accountability are core values. Violations are addressed through disciplinary measures. The code reinforces trust and credibility.'],
            ['Admin Policy', 'The Admin Policy governs office management and administrative systems. It covers assets, transport, facilities, and records management. Clear procedures ensure efficiency and accountability. Documentation and controls are mandatory. The policy supports operational effectiveness.'],
            ['Conflict of Interest Policy', 'This policy prevents personal interests from influencing professional decisions. Disclosure of conflicts is mandatory. Mitigation measures are clearly defined. The policy applies to staff, board members, and committees. It ensures impartiality and transparency.'],
            ['Environmental Protection Policy', "VDO's Environmental Protection Policy promotes environmentally responsible programming. It minimizes environmental harm during implementation. Environmental risks are assessed and mitigated. Climate resilience is integrated into programs. The policy supports sustainable development."],
            ['Zero Tolerance Policy', "The Zero Tolerance Policy enforces strict accountability for serious misconduct. It covers PSEA, fraud, abuse, and ethical violations. No exceptions or compromises are permitted. Violations result in decisive action. The policy upholds VDO's core values and integrity."],
        ];

        foreach ($policies as $i => [$title, $body]) {
            $iconNum = str_pad((string) ($i + 6), 2, '0', STR_PAD_LEFT);
            ResilienceItem::updateOrCreate(
                [
                    'section' => ResilienceItem::SECTION_POLICY,
                    'title' => $title,
                ],
                [
                    'section' => ResilienceItem::SECTION_POLICY,
                    'title' => $title,
                    'body' => $body,
                    'image' => "{$base}/{$iconNum}.svg",
                    'order' => $i + 1,
                    'is_active' => true,
                ],
            );
        }

        // Programmatic Approach (singleton)
        ResilienceItem::updateOrCreate(
            ['section' => ResilienceItem::SECTION_PROGRAMMATIC_APPROACH],
            [
                'section' => ResilienceItem::SECTION_PROGRAMMATIC_APPROACH,
                'title' => 'Programmatic Approach',
                'body' => "Since 2021, Vision Development Organization (VDO) has sustained a strong and resilient brand identity by maintaining operations and a female-led workforce despite severe restrictions on civic space and women's participation. This resilience is grounded in deep community acceptance, culturally informed engagement, and a proven record of integrity and responsible delivery. VDO's programmatic approach is comprehensive, context-responsive, and aligned with international humanitarian and development standards, ensuring inclusion, quality, and accountability across all interventions. Led by Afghan women and local experts, our programs prioritize localization, community leadership, and trusted access, while embedding robust safeguarding, compliance, and accountability systems throughout the project cycle. Through gender-responsive, conflict-sensitive, and do-no-harm approaches, VDO protects the dignity and safety of women and girls, advances equitable access for marginalized groups, and adapts rapidly to changing conditions using evidence-based decision-making and flexible operational models. Today, VDO stands as a symbol of Afghan women's leadership, the power of localization, and the trust placed in national actors to respond effectively to evolving community needs.",
                'image' => "{$base}/36.svg",
                'caption' => 'This enables VDO to reach crisis-affected populations that may otherwise be left behind.',
                'order' => 0,
                'is_active' => true,
            ],
        );

        // Collective Resilience (singleton)
        ResilienceItem::updateOrCreate(
            ['section' => ResilienceItem::SECTION_COLLECTIVE_RESILIENCE],
            [
                'section' => ResilienceItem::SECTION_COLLECTIVE_RESILIENCE,
                'title' => 'Contributing to Collective Resilience',
                'body' => "VDO is not only a frontline implementer but a recognized contributor to national coordination and advocacy efforts:\n\nVision Development Organization (VDO) embeds a comprehensive set of cross-cutting priorities across all humanitarian and development programs to ensure quality, safety, and inclusion in Afghanistan's highly sensitive operational environment. These priorities guide how programs are designed, delivered, and monitored, reinforcing principled action, community trust, and accountability. By systematically integrating gender equality, protection, accountability, and ethical standards into every intervention, VDO ensures that assistance not only reaches those most in need, but does so in a manner that safeguards dignity, minimizes risk, and strengthens long-term community resilience.",
                'bullets' => [
                    'Representing more than 200 NGOs through leadership in the ACBAR Steering Committee',
                    'Co-leading and actively shaping technical working groups such as the Education ALP Working Group',
                    'Bringing ground-level insights into humanitarian strategy decisions',
                    "Driving localization leadership and Afghan women's participation in policy dialogues",
                ],
                'order' => 0,
                'is_active' => true,
            ],
        );
    }
}
