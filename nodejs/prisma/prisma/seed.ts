import { prisma } from "../src/lib/prisma";

const CONTEST_DESCRIPTION = `A Olimpíada Paraibana de Informática visa despertar nos alunos o interesse em computação imprescindível na formação básica dos estudantes atualmente, através de uma atividade que envolve desafios motivadores e competição saudável. Esta competição também permite que os competidores possam conhecer de forma mais abrangente a carreira na área. Já para os alunos do ensino superior, a OPI visa estimular os alunos a aprimorarem e aprofundarem o conhecimento em Programação e Algoritmos. Além disso, a olimpíada almeja preparar melhor e despertar o interesse de alunos paraibanos para as competições nacionais e internacionais de programação, como a Olimpíada Brasileira e Internacional de Informática, e a ICPC. Estes alunos possivelmente se motivarão a entrar no curso de Ciência da Computação, e o conhecimento adquirido na preparação será muito valioso para a sua formação. A organização da OPI está a cargo do curso de Ciência da Computação da Universidade Federal de Campina Grande.`;

async function main() {
  await prisma.admin.deleteMany();
  await prisma.participant.deleteMany();
  await prisma.contest.deleteMany();
  await prisma.rule.deleteMany();
  await prisma.level.deleteMany();
  await prisma.participantsJoinContests.deleteMany();
  await prisma.question.deleteMany();
  await prisma.constraint.deleteMany();
  await prisma.inputOutputExample.deleteMany();
  await prisma.submission.deleteMany();

  await prisma.admin.create({
    data: {
      name: "Cristovao",
      email: "cristovao@gmail.com",
      password: "cristovao123",
    },
  });
  const { id: participantId } = await prisma.participant.create({
    data: {
      name: "Savio",
      email: "savio@gmail.com",
      password: "savio123",
    },
  });
  const { id: contestId } = await prisma.contest.create({
    data: {
      acronym: "OPI 2023",
      fullName: "Olimpíada Paraibana de Informática",
      cover: "https://github.com/cristovao-n.png",
      description: CONTEST_DESCRIPTION,
      place: "Unifacisa",
      capacity: 100,
      startDate: new Date("2023-07-06"),
      endDate: new Date("2023-07-08"),
    },
  });
  await prisma.rule.create({
    data: {
      text: "Este caderno de tarefas é composto por 9 páginas (não contando a folha de rosto), numeradas de 1 a 9. Verifique se o caderno está completo",
      contestId,
    },
  });
  const { id: levelId } = await prisma.level.create({
    data: {
      label: "Avançado Sênior",
      value: "AVANCADO_SENIOR",
      contestId,
    },
  });
  await prisma.participantsJoinContests.create({
    data: {
      contestId,
      levelId,
      participantId,
    },
  });
  const { id: questionId } = await prisma.question.create({
    data: {
      contestId,
      balloonColor: "#f3f3f3",
      name: "Soma",
      inputExplanation:
        "A primeira linha contém um inteiro A, a segunda linha contém um inteiro B.",
      outputExplanation:
        "Seu programa deve produzir uma única linha, contendo um único inteiro, que deve ser o valor total a ser pago ao hotel pela estadia.",
      testsFileInput: "~/Documents/soma-tests-input.txt",
      testsFileOutput: "~/Documents/soma-tests-output.txt",
    },
  });

  await prisma.constraint.create({
    data: {
      text: "-1000 <= A <= 1000",
      questionId,
    },
  });
  await prisma.constraint.create({
    data: {
      text: "-1000 <= B <= 1000",
      questionId,
    },
  });
  await prisma.inputOutputExample.create({
    data: {
      input: "310\n10\n",
      output: "320\n",
      questionId,
    },
  });
  await prisma.inputOutputExample.create({
    data: {
      input: "10\n-10\n",
      output: "0\n",
      questionId,
    },
  });
  await prisma.submission.create({
    data: {
      code: "",
      language: "JAVA",
      status: "PENDING",
      participantId,
      questionId,
      levelId,
    },
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (error) => {
    console.error(error);
    await prisma.$disconnect();
    process.exit(1);
  });
