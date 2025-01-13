const ClassroomPage = async ({ params }: { params: Promise<{ classroomId: string }> }) => {
  const { classroomId } = await params;
  return (
    <>
      <h1>Classroom</h1>
      <p>Classroom ID: {classroomId}</p>
    </>
  );
};

export default ClassroomPage;
