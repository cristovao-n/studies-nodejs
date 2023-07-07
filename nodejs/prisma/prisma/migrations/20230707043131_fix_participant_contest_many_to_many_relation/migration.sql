/*
  Warnings:

  - You are about to drop the `ContestAdmin` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `ContestParticipant` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_ContestToParticipant` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_ContestToParticipant" DROP CONSTRAINT "_ContestToParticipant_A_fkey";

-- DropForeignKey
ALTER TABLE "_ContestToParticipant" DROP CONSTRAINT "_ContestToParticipant_B_fkey";

-- DropTable
DROP TABLE "ContestAdmin";

-- DropTable
DROP TABLE "ContestParticipant";

-- DropTable
DROP TABLE "_ContestToParticipant";

-- CreateTable
CREATE TABLE "ParticipantsJoinContests" (
    "id" SERIAL NOT NULL,
    "contestId" INTEGER NOT NULL,
    "participantId" INTEGER NOT NULL,
    "levelId" INTEGER NOT NULL,

    CONSTRAINT "ParticipantsJoinContests_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "ParticipantsJoinContests" ADD CONSTRAINT "ParticipantsJoinContests_contestId_fkey" FOREIGN KEY ("contestId") REFERENCES "Contest"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ParticipantsJoinContests" ADD CONSTRAINT "ParticipantsJoinContests_participantId_fkey" FOREIGN KEY ("participantId") REFERENCES "Participant"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ParticipantsJoinContests" ADD CONSTRAINT "ParticipantsJoinContests_levelId_fkey" FOREIGN KEY ("levelId") REFERENCES "Level"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
