import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const { courseId, title, description, videoUrl, durationMinutes, orderSequence } = await request.json()

    // TODO: Connect to database
    // const lesson = await db.videoLessons.create({
    //   course_id: courseId,
    //   title_en: title,
    //   description,
    //   video_url: videoUrl,
    //   duration_minutes: durationMinutes,
    //   order_sequence: orderSequence,
    // })

    return NextResponse.json({
      success: true,
      data: {
        id: "lesson-" + Date.now(),
        courseId,
        title,
        videoUrl,
        durationMinutes,
        orderSequence,
      },
    })
  } catch (error) {
    return NextResponse.json({ error: "Failed to create video lesson" }, { status: 500 })
  }
}
