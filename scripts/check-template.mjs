import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import vm from 'node:vm';

// Execute the shipped inline script with a minimal DOM, so model and assessment
// regressions exercise the real template rather than copied implementations.
const html = readFileSync(new URL('../templates/interactive-lesson.html', import.meta.url), 'utf8');
const source = html.match(/<script>([\s\S]*?)<\/script>/)[1];
const nodes = new Map();
function node(id) {
  if (!nodes.has(id)) nodes.set(id, {
    value: id === 'rate' ? '10' : id === 'year' ? '10' : '',
    textContent: '', innerHTML: '', hidden: false, disabled: false,
    listeners: {}, attrs: {},
    setAttribute(key, value) { this.attrs[key] = value; },
    addEventListener(event, fn) { this.listeners[event] = fn; },
    focus() { this.focused = true; }, select() { this.selected = true; },
  });
  return nodes.get(id);
}
let copiedText = null;
const clipboard = { writeText: async text => { copiedText = text; } };
const browserNavigator = { clipboard };
const errors = [];
const context = vm.createContext({
  navigator: browserNavigator,
  console: { error: (...args) => errors.push(args) },
  document: { getElementById: node, querySelectorAll: () => [] },
  window: { addEventListener() {} },
  matchMedia: () => ({ matches: false }),
  setInterval: () => 1, clearInterval() {}, setTimeout() {},
  confirm: () => false,
  FormData: class { constructor(target) { this.target = target; } has(k) { return k in this.target; } get(k) { return this.target[k]; } },
});
vm.runInContext(source, context);
const run = code => vm.runInContext(code, context);
for (const rate of [0, 1, 5, 10, 15]) {
  for (let year = 0; year <= 10; year++) {
    const actual = run(`compound(1000,${rate},${year})`);
    // Independent repeated yearly accumulation, rather than the template's power formula.
    let expected = 1000;
    for (let i = 0; i < year; i++) expected += expected * rate / 100;
    assert.ok(Math.abs(actual - expected) < 1e-8);
    assert.ok(actual >= run(`simple(1000,${rate},${year})`) - 1e-8);
  }
}
node('rate').value = '0'; run('draw()');
assert.match(node('observation').textContent, /both balances stay/);
node('rate').value = '10'; node('year').value = '1'; run('draw()');
assert.match(node('observation').textContent, /balances match/);
node('year').value = '2'; run('draw()');
assert.match(node('observation').textContent, /10.00/);
assert.match(node('breakdown').textContent, /110.00/);
run("$('quizForm').onsubmit({preventDefault(){},target:{}})");
assert.match(node('quizStatus').textContent, /Answer each/);
run("$('quizForm').onsubmit({preventDefault(){},target:{q1:'1',q2:'1',q3:'2'}})");
assert.match(node('quizStatus').textContent, /3 of 3/);
run("$('quizForm').onsubmit({preventDefault(){},target:{q1:'0',q2:'0',q3:'0'}})");
assert.match(node('quizStatus').textContent, /0 of 3/);
node('quizForm').listeners.change();
assert.equal(node('feedback-q1').hidden, true);
assert.match(node('quizStatus').textContent, /Answers changed/);
run("$('writtenForm').onsubmit({preventDefault(){}})");
assert.match(node('writtenStatus').textContent, /all three/);
const variants = new Set();
for (let i = 0; i < 12; i++) {
  variants.add(run('JSON.stringify([test.p,test.r,test.t])'));
  const expected = run('money(compound(test.p,test.r,test.t))');
  assert.ok(run('test.questions[0].model').includes(expected));
  assert.equal(run('test.questions.flatMap(q=>q.criteria).length'), 9);
  run('makeTest()');
}
assert.equal(variants.size, 12);
node('w1').value='My calculation';node('w2').value='My comparison';node('w3').value='My explanation';
run("$('writtenForm').onsubmit({preventDefault(){}})");
assert.equal(node('w1').readOnly, true);
assert.equal(node('rubric').hidden, false);
assert.equal(node('submitWritten').disabled, true);
const oldId = run('test.id');
run("$('newTest').onclick()");
assert.equal(run('test.id'), oldId, 'Cancelling replacement retains the attempt');
assert.equal(node('again').disabled, true);
run("$('flashcard').onclick()");
assert.equal(node('cardPrompt').hidden, true);
assert.equal(node('cardAnswer').hidden, false);
assert.ok(node('flashcard').attrs['aria-label'].includes(run('cards[queue[0]].a')));
assert.equal(node('again').disabled, false);
run("$('flashcard').onclick()");
assert.equal(node('cardPrompt').hidden, false);
assert.equal(node('cardAnswer').hidden, true);
assert.equal(node('again').disabled, true);
run("$('reveal').onclick(); $('again').onclick()");
assert.equal(run('queue.length'), 4);
run("$('reveal').onclick(); $('known').onclick()");
assert.equal(run('queue.length'), 3);
while (run('queue.length')) run("$('reveal').onclick(); $('known').onclick()");
assert.equal(node('restartCards').focused, true);
assert.equal(node('flashcard').disabled, true);
await run("$('copyAttempt').onclick()");
assert.ok(copiedText.includes('My calculation'));
assert.ok(copiedText.includes('MODEL ANSWER:'));
assert.ok(copiedText.includes('RUBRIC:'));
assert.ok(copiedText.includes(oldId));
assert.ok(copiedText.includes('State: Submitted'));
assert.equal(node('manualCopy').hidden, true);
assert.equal(node('copyAttempt').disabled, false);
clipboard.writeText = async () => { const error = new Error('Denied'); error.name = 'NotAllowedError'; throw error; };
await run("$('copyAttempt').onclick()");
assert.equal(node('manualCopy').hidden, false);
assert.equal(node('gradingText').value, copiedText);
assert.equal(node('gradingText').selected, true);
assert.match(node('writtenStatus').textContent, /Automatic copying is unavailable/);
assert.equal(node('copyAttempt').disabled, false);
browserNavigator.clipboard = undefined;
await run("$('copyAttempt').onclick()");
assert.equal(node('manualCopy').hidden, false);
assert.equal(errors.length, 2);
run('makeTest()'); node('w1').value=''; node('w2').value=''; node('w3').value='';
assert.match(run('gradingRequest()'), /Draft — not yet submitted/);
assert.match(run('gradingRequest()'), /No answer supplied/);
assert.equal(node('manualCopy').hidden, true);
assert.ok(!/<(?:script|link)[^>]+(?:src|href)=/i.test(html), 'No external script or CSS');
assert.ok(!/\bfetch\s*\(/.test(source), 'No runtime network requests');
const bank = JSON.parse(readFileSync(new URL('../templates/assessment-bank.json', import.meta.url)));
assert.equal(bank.quizzes[0].options.filter(o=>o.correct).length, 1);
assert.equal(bank.writtenTests[0].rubric.reduce((sum,c)=>sum+c.points,0), 3);
console.log('PASS: 55 model cases, chart edge cases, quiz validation/edit/retry states, 12 written variants, rubrics, submission/replacement, flashcard front/back/review, clipboard success/denied/missing API, offline checks.');
