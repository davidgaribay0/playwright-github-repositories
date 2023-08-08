import type { FullConfig, FullResult, Reporter, Suite, TestCase, TestResult, TestStatus } from '@playwright/test/reporter';
import { IncomingWebhook } from '@slack/webhook';

class SlackReporter implements Reporter {
    url = process.env.SLACK_WEBHOOK_URL;
    webhook = new IncomingWebhook(this.url!);
    results: { title: string; status: TestStatus; }[] = []

    async sendSlackMessage() {
        const output = this.results.map((result) => `\n- ${result.status.toUpperCase()} : ${result.title}`)
        console.log(output)
        await this.webhook.send({
            icon_emoji: ':test_tube:',
            text: `Test has finished ${output.join(" ")}`,
        });
    }

    onBegin(config: FullConfig, suite: Suite) {
    }

    onTestBegin(test: TestCase, result: TestResult) {
    }

    onTestEnd(test: TestCase, result: TestResult) {
        this.results.push(
            {
                title: test.title,
                status: result.status
            }
        )
        console.log(`Finished test ${test.title}: ${result.status}`);
    }

    async onEnd(result: FullResult) {
        await this.sendSlackMessage();
    }
}

export default SlackReporter;