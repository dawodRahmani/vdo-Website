<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>VDO Report</title>
</head>
<body style="font-family: Arial, sans-serif; color: #222; line-height: 1.5;">
    <h2 style="color: rgb(62,64,149); margin-bottom: 8px;">New Report from VDO Website</h2>
    <p style="color: #666; margin-top: 0;">A visitor submitted the Make-a-Report form on the Our Commitment page.</p>

    <table cellpadding="6" cellspacing="0" style="border-collapse: collapse; margin-top: 16px;">
        <tr>
            <td valign="top" style="border: 1px solid #eee; background: #f6f6f6; font-weight: bold;">Subject</td>
            <td style="border: 1px solid #eee;">{{ $subjectLine }}</td>
        </tr>
        <tr>
            <td valign="top" style="border: 1px solid #eee; background: #f6f6f6; font-weight: bold;">Comment</td>
            <td style="border: 1px solid #eee; white-space: pre-wrap;">{{ $comment }}</td>
        </tr>
    </table>

    <p style="margin-top: 24px; color: #888; font-size: 12px;">
        Submitted via vdongo.org
    </p>
</body>
</html>
